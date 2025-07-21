import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
} from '../../../../redux/features/categoryCreation/categoryCreationApi';
import { selectedCategory } from '../../../../redux/features/categoryCreation/categoryCreationSlice';
import { useGetAllMenuQuery } from '../../../../redux/features/menuCreation/menuCreationApi';
import { useGetAllRestaurantQuery } from '../../../../redux/features/restaurentCreation/restaurentCreationApi';

const AddCategoryModal = ({
	setShowAddCategoryModal,
	isEditing,
	categoryDetails,
}) => {
	const dispatch = useDispatch();
	// const { data: allMenus, isLoading, isError, error } = useGetAllMenuQuery();
	const [selectedRestaurantId, setSelectedRestaurantId] = useState('');

	const [createCategory, { isSuccess, isLoading: createCategoryLoading }] =
		useCreateCategoryMutation();

	const {
		data: allRestaurant, // todo need to extra property proper location data
	} = useGetAllRestaurantQuery();
	const [categoryName, setCategoryName] = useState('');
	const [categoryDescription, setCategoryDescription] = useState('');
	useEffect(() => {
		// Reset form fields when switching between "Add" and "Edit" modes
		if (isEditing) {
			setCategoryName(categoryDetails.name || '');
			setCategoryDescription(categoryDetails.description || '');
		} else {
			setCategoryName('');
			setCategoryDescription('');
		}
	}, [isEditing, categoryDetails]);
	const [
		updateCategory,
		{
			isLoading: categoryUpdateLoading,
			isError: categoryUpdateError,
			isSuccess: categoryUpdateSuccess,
		},
	] = useUpdateCategoryMutation();
	// for getting categories
	const {
		data: allMenus,
		isLoading: menuLoading,
		isError: isMenuError,
		error: menuError,
	} = useGetAllMenuQuery({ restaurant: selectedRestaurantId });

	const handleSubmit = (e) => {
		e.preventDefault();
		const categoryObj = {
			name: categoryName,
			description: categoryDescription,
			menu: e.target.menu.value,
			restaurant: e.target.restaurant.value,
		};
		if (isEditing) {
			updateCategory({
				id: categoryDetails.id,
				categoryItem: categoryObj,
			});
		} else {
			createCategory(categoryObj);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			dispatch(
				selectedCategory({ isEditing: false, selectedCategoryData: {} })
			);
			setShowAddCategoryModal(false);
			toast.success('Successfully added a category');
		}
		if (categoryUpdateSuccess) {
			dispatch(
				selectedCategory({ isEditing: false, selectedCategoryData: {} })
			);
			setShowAddCategoryModal(false);
			toast.success('Successfully updated the category');
		}
	}, [isSuccess, categoryUpdateSuccess]);

	return (
		<>
			<input
				type='checkbox'
				id={
					isEditing
						? `add_category_modal_${categoryDetails.id}`
						: 'add_category_modal'
				}
				className='modal-toggle'
			/>
			<div className='modal'>
				<div className='modal-box'>
					<h1 className='text-2xl mb-6 font-bold font-sans'>
						{isEditing ? 'Edit' : 'Add A'} Category
					</h1>
					<form onSubmit={handleSubmit}>
						<div className='form-control w-full'>
							<label className='label'>
								<span className='label-text'>
									Category Name
								</span>
							</label>
							<input
								required
								value={categoryName}
								onChange={(e) =>
									setCategoryName(e.target.value)
								}
								name='categoryName'
								type='text'
								placeholder='Category Name'
								className='input input-bordered w-full'
							/>
						</div>

						<div className='form-control w-full'>
							<label className='label'>
								<span className='label-text'>Description</span>
							</label>
							<textarea
								value={categoryDescription}
								onChange={(e) =>
									setCategoryDescription(e.target.value)
								}
								className='textarea textarea-bordered'
								placeholder='Description'
								name='categoryDescription'
							></textarea>
						</div>
						<div className='form-control w-full'>
							{/* image with file */}
							<label className='label'>
								<span className='label-text'>
									Category Image
								</span>
							</label>
							<input
								// name="itemImage"
								type='file'
								className='file-input file-input-bordered'
							/>
						</div>

						<div className='form-control w-full'>
							<label className='label'>
								<span className='label-text'>
									Select Restaurant
								</span>
							</label>
							<select
								required
								className='select select-bordered w-full'
								name='restaurant'
								onChange={(e) =>
									setSelectedRestaurantId(e.target.value)
								}
							>
								{allRestaurant?.results?.map((item) => (
									<option
										selected={
											categoryDetails.restaurant ===
											item.id
										}
										value={item.id}
										key={item.id}
									>
										{item.name}
									</option>
								))}
							</select>
						</div>

						<div className='form-control w-full'>
							<label className='label'>
								<span className='label-text'>Select Menu</span>
							</label>
							<select
								required
								className='select select-bordered w-full'
								name='menu'
								// onChange={(e) => // console.log(e.target.value)}
							>
								{/*  <option disabled selected>
                  Select Menu
                </option> */}
								{allMenus?.results?.map((item) => (
									<option
										selected={
											categoryDetails.menu === item.id
										}
										value={item.id}
										key={item.id}
									>
										{item.title}
									</option>
								))}
							</select>
						</div>

						<div className='form-control'>
							<label className='label cursor-pointer'>
								<span className='label-text'>
									Show in homepage
								</span>
								<input
									type='checkbox'
									className='checkbox checkbox-primary'
								/>
							</label>
						</div>
						<div className='modal-action'>
							<label htmlFor='add_category_modal'>
								<button
									disabled={
										categoryUpdateLoading ||
										createCategoryLoading
									}
									name='save'
									className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2'
									type='submit'
								>
									{isEditing
										? 'Save changes'
										: '+ Add New Category'}
								</button>
							</label>
						</div>
					</form>
				</div>
				<label
					onClick={() =>
						dispatch(
							selectedCategory({
								isEditing: false,
								selectedCategoryData: {},
							})
						)
					}
					className='modal-backdrop'
					htmlFor={
						isEditing
							? `add_category_modal_${categoryDetails.id}`
							: 'add_category_modal'
					}
				>
					Close
				</label>
			</div>
		</>
	);
};

export default AddCategoryModal;
