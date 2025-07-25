/*! Epson ePOS SDK Version 2.27.0 Copyright(C) Seiko Epson Corporation 2016 - 2023 All rights reserved. */
(function (window, undefined) {
  function callbackInfo() {
    this.callbackInfoList = new Object();
  }
  callbackInfo.prototype = {
    addCallback: function (callback, sq) {
      this.callbackInfoList[sq] = callback;
    },
    removeCallback: function (sq) {
      for (var i in this.callbackInfoList) {
        if (i == sq) {
          delete this.callbackInfoList[i];
          return;
        }
      }
    },
    getCallback: function (sq) {
      if (this.callbackInfoList[sq] != null) {
        return this.callbackInfoList[sq];
      }
      return null;
    },
  };
  function CommBox(boxID, commBoxManager, callbackInfo) {
    this.ERROR_OK = "OK";
    this.ERROR_NOT_OPENED = "NOT_OPENED";
    this.ERROR_MEMBER_NOT_FOUND = "MEMBER_NOT_FOUND";
    this.ERROR_SYSTEM_ERROR = "SYSTEM_ERROR";
    this.boxID = boxID;
    this.commBoxManager = commBoxManager;
    this.callbackInfo = callbackInfo;
    this.onreceive = null;
    this.connectionObj = this.commBoxManager.connectionObj;
  }
  CommBox.prototype = {
    getCommHistory: function (option, callback) {
      var _option = typeof option == "function" ? null : option;
      var _callback = typeof option == "function" ? option : callback;
      var allHistory =
        _option == null || _option.allHistory == null
          ? false
          : option.allHistory;
      var data = {
        type: "getcommhistory",
        box_id: this.boxID,
        all_history: allHistory,
      };
      var eposmsg = MessageFactory.getCommBoxDataMessage(data);
      if (!this.commBoxManager.isOpened(this.getBoxId())) {
        if (_callback != null) {
          _callback(this.ERROR_NOT_OPENED, null, eposmsg.sequence);
        }
        return eposmsg.sequence;
      }
      this.callbackInfo.addCallback(_callback, eposmsg.sequence);
      this.connectionObj.emit(eposmsg);
      return eposmsg.sequence;
    },
    send: function (message, memberID, callback) {
      var data = {
        type: "send",
        box_id: this.boxID,
        message: message,
        member_id: memberID,
      };
      var eposmsg = MessageFactory.getCommBoxDataMessage(data);
      if (!this.commBoxManager.isOpened(this.getBoxId())) {
        if (callback != null) {
          callback(this.ERROR_NOT_OPENED, 0, eposmsg.sequence);
        }
        return eposmsg.sequence;
      }
      this.callbackInfo.addCallback(callback, eposmsg.sequence);
      this.connectionObj.emit(eposmsg);
      return eposmsg.sequence;
    },
    client_getcommhistory: function (data, sq) {
      var code = data.code;
      var historyList = data.history_list;
      var getCommHistoryCB = this.callbackInfo.getCallback(sq);
      this.callbackInfo.removeCallback(sq);
      if (getCommHistoryCB != null) {
        getCommHistoryCB(code, historyList, sq);
      }
      return;
    },
    client_send: function (data, sq) {
      var code = data.code;
      var count = data.count;
      var sendCB = this.callbackInfo.getCallback(sq);
      this.callbackInfo.removeCallback(sq);
      if (sendCB != null) {
        sendCB(code, count, sq);
      }
      return;
    },
    client_onreceive: function (data, sq) {
      var rcvData = new Object();
      rcvData.senderId = data.sender_id;
      rcvData.receiverId = data.receiver_id;
      rcvData.message = data.message;
      if (this.onreceive != null) {
        this.onreceive(rcvData);
      }
      return;
    },
    getBoxId: function () {
      return this.boxID;
    },
  };
  function CommBoxManager() {
    this.ERROR_OK = "OK";
    this.ERROR_BOX_COUNT_OVER = "BOX_COUNT_OVER";
    this.ERROR_BOX_CLIENT_OVER = "BOX_CLIENT_OVER";
    this.ERROR_MEMBERID_ALREADY_USED = "MEMBERID_ALREADY_USED";
    this.ERROR_ALREADY_OPENED = "ALREADY_OPENED";
    this.ERROR_NOT_OPENED = "NOT_OPENED";
    this.ERROR_PARAMETER_ERROR = "PARAMETER_ERROR";
    this.ERROR_SYSTEM_ERROR = "SYSTEM_ERROR";
    this.callbackInfo = new callbackInfo();
    this.commBoxList = new Array();
    this.connectionObj = null;
  }
  CommBoxManager.prototype = {
    setConnectionObject: function (connectionObj) {
      this.connectionObj = connectionObj;
    },
    openCommBox: function (boxID, option, callback) {
      var memberID = "";
      if (option != null && option.memberID != null) {
        memberID = option.memberID;
      }
      var data = { box_id: boxID, member_id: memberID };
      var eposmsg = MessageFactory.getOpenCommBoxMessage(data);
      if (!this.connectionObj.isUsableDeviceIF()) {
        callback(null, this.ERROR_SYSTEM_ERROR, eposmsg.sequence);
        return eposmsg.sequence;
      }
      this.connectionObj.emit(eposmsg);
      this.callbackInfo.addCallback(callback, eposmsg.sequence);
      return eposmsg.sequence;
    },
    closeCommBox: function (boxObj, callback) {
      var data = { box_id: boxID };
      var eposmsg = MessageFactory.getCloseCommBoxMessage(data);
      try {
        var boxID = boxObj.getBoxId();
        data.box_id = boxID;
        eposmsg = MessageFactory.getCloseCommBoxMessage(data);
        if (!this.isOpened(boxID)) {
          if (callback != null) {
            callback(this.ERROR_NOT_OPENED, eposmsg.sequence);
          }
          return eposmsg.sequence;
        }
        this.connectionObj.emit(eposmsg);
      } catch (e) {
        if (callback != null) {
          callback(this.ERROR_PARAMETER_ERROR, eposmsg.sequence);
        }
      }
      this.callbackInfo.addCallback(callback, eposmsg.sequence);
      return eposmsg.sequence;
    },
    client_opencommbox: function (data, sq) {
      var boxID = data.box_id;
      var code = data.code;
      var commBoxObj = null;
      if (code == this.ERROR_OK && this.getCommBox(boxID) == null) {
        commBoxObj = new CommBox(boxID, this, this.callbackInfo);
      }
      if (commBoxObj != null) {
        this.commBoxList.push(commBoxObj);
      }
      var openCommBoxCB = this.callbackInfo.getCallback(sq);
      this.callbackInfo.removeCallback(sq);
      if (openCommBoxCB != null) {
        openCommBoxCB(commBoxObj, code, sq);
      }
      return;
    },
    client_closecommbox: function (data, sq) {
      var boxID = data.box_id;
      var code = data.code;
      this.removeCommBox(boxID);
      var closeCommBoxCB = this.callbackInfo.getCallback(sq);
      this.callbackInfo.removeCallback(sq);
      if (closeCommBoxCB != null) {
        closeCommBoxCB(code, sq);
      }
      return;
    },
    executeCommDataCallback: function (data, sq) {
      var boxID = data.box_id;
      var commBoxObj = this.getCommBox(boxID);
      var method = "client_" + data.type;
      try {
        eval("commBoxObj." + method + "(data, sq)");
      } catch (e) {
        throw new Error("");
      }
      return;
    },
    getCommBox: function (boxID) {
      var commBoxObj = null;
      for (var i = 0; i < this.commBoxList.length; i++) {
        if (this.commBoxList[i].getBoxId() == boxID) {
          commBoxObj = this.commBoxList[i];
          break;
        }
      }
      return commBoxObj;
    },
    removeCommBox: function (boxID) {
      var result = false;
      for (var i = 0; i < this.commBoxList.length; i++) {
        if (this.commBoxList[i].getBoxId() == boxID) {
          this.commBoxList.splice(i, 1);
          result = true;
          break;
        }
      }
      return result;
    },
    isOpened: function (boxID) {
      var result = false;
      for (var i = 0; i < this.commBoxList.length; i++) {
        if (this.commBoxList[i].getBoxId() == boxID) {
          result = true;
          break;
        }
      }
      return result;
    },
  };
  function DeviceObjectSelector() {
    this.type2objectMap = {
      type_scanner: "Scanner",
      type_keyboard: "Keyboard",
      type_poskeyboard: "POSKeyboard",
      type_msr: "MSR",
      type_cat: "CAT",
      type_cash_changer: "CashChanger",
      type_printer: "Printer",
      type_display: "Display",
      type_simple_serial: "SimpleSerial",
      type_hybrid_printer: "HybridPrinter",
      type_hybrid_printer2: "HybridPrinter2",
      type_dt: "DeviceTerminal",
      type_other_peripheral: "OtherPeripheral",
      type_storage: "GermanyFiscalElement",
    };
    this.connectionObj = null;
  }
  DeviceObjectSelector.prototype = {
    setConnectionObject: function (connectionObj) {
      this.connectionObj = connectionObj;
    },
    isSelectable: function (deviceType) {
      if (this.connectionObj.isUsableDeviceIF()) {
        return true;
      } else {
        if (
          deviceType == "type_printer" &&
          this.connectionObj.isUsablePrintIF()
        ) {
          return true;
        } else {
          if (
            deviceType == "type_display" &&
            this.connectionObj.isUsableDisplayIF()
          ) {
            return true;
          }
        }
      }
      return false;
    },
    select: function (
      deviceId,
      deviceType,
      specificDevice,
      isCrypto,
      ePOSDeviceContext
    ) {
      var deviceObjectName = "";
      if (typeof specificDevice == "string") {
        deviceObjectName = specificDevice;
      } else {
        deviceObjectName = this.type2objectMap[deviceType];
      }
      var templateObject = null;
      try {
        templateObject = eval(deviceObjectName);
      } catch (e) {
        throw new Error("ERROR_PARAMETER");
      }
      if (typeof templateObject != "function") {
        throw new Error("ERROR_PARAMETER");
      }
      if (
        deviceObjectName == "Printer" ||
        deviceObjectName == "Display" ||
        deviceObjectName == "HybridPrinter" ||
        deviceObjectName == "HybridPrinter2"
      ) {
        return new templateObject(deviceId, isCrypto, ePOSDeviceContext);
      } else {
        return new templateObject(deviceId, isCrypto);
      }
    },
  };
  function CashChanger(deviceID, isCrypto) {
    this.CONFIG_LEFT_CASH = "CONFIG_LEFT_CASH";
    this.CONFIG_COUNT_MODE = "CONFIG_COUNT_MODE";
    this.MODE_MANUAL_INPUT = "MODE_MANUAL_INPUT";
    this.MODE_AUTOCOUNT = "MODE_AUTO_COUNT";
    this.DEPOSIT_CHANGE = "DEPOSIT_CHANGE";
    this.DEPOSIT_NOCHANGE = "DEPOSIT_NOCHANGE";
    this.DEPOSIT_REPAY = "DEPOSIT_REPAY";
    this.COLLECT_ALL_CASH = "ALL_CASH";
    this.COLLECT_PART_OF_CASH = "PART_OF_CASH";
    this.SUE_POWER_ONLINE = 2001;
    this.SUE_POWER_OFF = 2002;
    this.SUE_POWER_OFFLINE = 2003;
    this.SUE_POWER_OFF_OFFLINE = 2004;
    this.SUE_STATUS_EMPTY = 11;
    this.SUE_STATUS_NEAREMPTY = 12;
    this.SUE_STATUS_EMPTYOK = 13;
    this.SUE_STATUS_FULL = 21;
    this.SUE_STATUS_NEARFULL = 22;
    this.SUE_STATUS_FULLOK = 23;
    this.SUE_STATUS_JAM = 31;
    this.SUE_STATUS_JAMOK = 32;
    this.deviceID = deviceID;
    this.isCrypto = isCrypto;
    this.connectionObj = null;
  }
  CashChanger.prototype = {
    setConnectionObject: function (connectionObj) {
      this.connectionObj = connectionObj;
    },
    client_oncashcounts: function (data) {
      try {
        if (this.oncashcounts == null) {
          return;
        }
        this.oncashcounts(data);
      } catch (e) {}
      return;
    },
    client_onstatuschange: function (data) {
      try {
        if (this.onstatuschange == null) {
          return;
        }
        this.onstatuschange(data);
      } catch (e) {}
      return;
    },
    client_ondeposit: function (data) {
      try {
        if (this.ondeposit == null) {
          return;
        }
        this.ondeposit(data);
      } catch (e) {}
      return;
    },
    client_ondispense: function (data) {
      try {
        if (this.ondispense == null) {
          return;
        }
        this.ondispense(data);
      } catch (e) {}
      return;
    },
    client_oncollect: function (data) {
      try {
        if (this.oncollect == null) {
          return;
        }
        this.oncollect(data);
      } catch (e) {}
      return;
    },
    client_onconfigchange: function (data) {
      try {
        if (this.onconfigchange == null) {
          return;
        }
        this.onconfigchange(data);
      } catch (e) {}
      return;
    },
    client_oncommandreply: function (data) {
      try {
        if (this.oncommandreply == null) {
          return;
        }
        if (typeof data.command != "") {
        } else {
          var hexData = data.data;
          hexData = hexData.replace(/[0-9a-fA-F]{2}/g, function (c) {
            var hexNum = parseInt(c, 16);
            return String.fromCharCode(hexNum);
          });
          data.data = hexData;
        }
        this.oncommandreply(data);
      } catch (e) {}
      return;
    },
    client_ondirectio: function (data) {
      try {
        if (this.ondirectio == null) {
          return;
        }
        this.ondirectio(data);
      } catch (e) {}
      return;
    },
    client_onstatusupdate: function (data) {
      try {
        if (this.onstatusupdate == null) {
          return;
        }
        this.onstatusupdate(data);
      } catch (e) {}
      return;
    },
    readCashCounts: function () {
      var data = { type: "readcashcounts" };
      return this.send(data);
    },
    beginDeposit: function () {
      var data = { type: "begindeposit" };
      return this.send(data);
    },
    pauseDeposit: function () {
      var data = { type: "pausedeposit" };
      return this.send(data);
    },
    restartDeposit: function () {
      var data = { type: "restartdeposit" };
      return this.send(data);
    },
    endDeposit: function (cmd) {
      var data = { type: "enddeposit", cmd: cmd };
      return this.send(data);
    },
    dispenseCash: function (data) {
      var data_;
      if (typeof data == "object") {
        data_ = data;
        data_.type = "dispensecash";
      } else {
        data_ = { type: "dispensecash", cash: data };
      }
      return this.send(data_);
    },
    dispenseChange: function (cash) {
      var data_;
      if (typeof cash == "object") {
        data_ = cash;
        data_.type = "dispensechange";
      } else {
        data_ = { type: "dispensechange", cash: cash };
      }
      return this.send(data_);
    },
    openDrawer: function () {
      var data = { type: "opendrawer" };
      return this.send(data);
    },
    collectCash: function (collectMode) {
      var data = { type: "collectcash", collectmode: collectMode };
      return this.send(data);
    },
    setConfig: function (config, value) {
      var data = null;
      switch (config) {
        case this.CONFIG_COUNT_MODE:
          data = { type: "setconfig", config: config, mode: value.mode };
          break;
        case this.CONFIG_LEFT_CASH:
          if (value.bills == null || value.bills == "") {
            value.bills = "0";
          }
          if (value.coins == null || value.coins == "") {
            value.coins = "0";
          }
          data = {
            type: "setconfig",
            config: config,
            bills: value.bills,
            coins: value.coins,
          };
          break;
        default:
          break;
      }
      var sq = -1;
      if (data != null) {
        sq = this.send(data);
      }
      return sq;
    },
    sendCommand: function (command) {
      var data;
      if (typeof command == "object") {
        data = command;
        data.type = "sendcommand";
      } else {
        data = { type: "sendcommand", command: toHexBinary(command) };
      }
      return this.send(data);
    },
    callEvent: function (eventName, data) {
      var eventReq = data;
      eventReq.type = eventName;
      return this.send(eventReq);
    },
    send: function (data) {
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        data,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {}
      return sequence;
    },
  };
  function CAT(deviceID, isCrypto) {
    this.SUE_LOGSTATUS_OK = 0;
    this.SUE_LOGSTATUS_NEARFULL = 1;
    this.SUE_LOGSTATUS_FULL = 2;
    this.SUE_POWER_ONLINE = 2001;
    this.SUE_POWER_OFF_OFFLINE = 2004;
    this.deviceID = deviceID;
    this.isCrypto = isCrypto;
    this.timeout = 0;
    this.trainingMode = false;
    this.connectionObj = null;
  }
  CAT.prototype = {
    setConnectionObject: function (connectionObj) {
      this.connectionObj = connectionObj;
    },
    authorizeSales: function (data) {
      var _data = {
        service: data.service,
        total_amount: data.totalAmount,
        amount: data.amount,
        tax: data.tax,
        sequence: data.sequence,
        additional_security_information: data.additionalSecurityInformation,
      };
      _data.type = "authorizesales";
      _data.training = this.trainingMode;
      _data.timeout = this.timeout;
      return this.send(_data);
    },
    authorizeVoid: function (data) {
      var _data = {
        service: data.service,
        total_amount: data.totalAmount,
        amount: data.amount,
        tax: data.tax,
        sequence: data.sequence,
        additional_security_information: data.additionalSecurityInformation,
      };
      _data.type = "authorizevoid";
      _data.training = this.trainingMode;
      _data.timeout = this.timeout;
      return this.send(_data);
    },
    authorizeRefund: function (data) {
      var _data = {
        service: data.service,
        total_amount: data.totalAmount,
        amount: data.amount,
        tax: data.tax,
        sequence: data.sequence,
        additional_security_information: data.additionalSecurityInformation,
      };
      _data.type = "authorizerefund";
      _data.training = this.trainingMode;
      _data.timeout = this.timeout;
      return this.send(_data);
    },
    authorizeCompletion: function (data) {
      var _data = {
        service: data.service,
        total_amount: data.totalAmount,
        amount: data.amount,
        tax: data.tax,
        sequence: data.sequence,
        additional_security_information: data.additionalSecurityInformation,
      };
      _data.type = "authorizecompletion";
      _data.training = this.trainingMode;
      _data.timeout = this.timeout;
      return this.send(_data);
    },
    accessDailyLog: function (data) {
      var _data = {
        service: data.service,
        total_amount: data.totalAmount,
        sequence: data.sequence,
        dailylog_type: data.dailylogType,
        additional_security_information: data.additionalSecurityInformation,
      };
      _data.type = "accessdailylog";
      _data.training = this.trainingMode;
      _data.timeout = this.timeout;
      return this.send(_data);
    },
    sendCommand: function (data) {
      var _data = {
        service: data.service,
        command: data.command,
        data: data.data,
        string: data.string,
        additional_security_information: data.additionalSecurityInformation,
      };
      _data.type = "sendcommand";
      _data.training = this.trainingMode;
      return this.send(_data);
    },
    checkConnection: function (data) {
      var _data = {
        type: "checkconnection",
        additional_security_information: data.additionalSecurityInformation,
      };
      _data.timeout = this.timeout;
      return this.send(_data);
    },
    clearOutput: function () {
      var _data = { type: "clearoutput" };
      return this.send(_data);
    },
    scanCode: function () {
      var _timeout;
      if (this.timeout == 0) {
        _timeout = 60000;
      } else {
        _timeout = this.timeout;
      }
      var _data = { type: "scancode" };
      _data.training = this.trainingMode;
      _data.timeout = _timeout;
      return this.send(_data);
    },
    scanData: function (data) {
      var _timeout;
      if (this.timeout == 0) {
        _timeout = 150000;
      } else {
        _timeout = this.timeout;
      }
      var _data = { command: data.command, string: data.string };
      _data.type = "scandata";
      _data.training = this.trainingMode;
      _data.timeout = _timeout;
      return this.send(_data);
    },
    cashDeposit: function (data) {
      var _data = {
        service: data.service,
        amount: data.amount,
        sequence: data.sequence,
      };
      _data.type = "cashdeposit";
      _data.training = this.trainingMode;
      _data.timeout = this.timeout;
      return this.send(_data);
    },
    send: function (data) {
      var tmp = this.deviceID;
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        data,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {}
      return sequence;
    },
    client_onauthorizesales: function (data) {
      try {
        if (this.onauthorizesales == null) {
          return;
        }
        this.onauthorizesales(this.getResultObject(data));
      } catch (e) {}
      return;
    },
    client_onauthorizevoid: function (data) {
      try {
        if (this.onauthorizevoid == null) {
          return;
        }
        this.onauthorizevoid(this.getResultObject(data));
      } catch (e) {}
      return;
    },
    client_onauthorizerefund: function (data) {
      try {
        if (this.onauthorizerefund == null) {
          return;
        }
        this.onauthorizerefund(this.getResultObject(data));
      } catch (e) {}
      return;
    },
    client_onauthorizecompletion: function (data) {
      try {
        if (this.onauthorizecompletion == null) {
          return;
        }
        this.onauthorizecompletion(this.getResultObject(data));
      } catch (e) {}
      return;
    },
    client_onaccessdailylog: function (data) {
      try {
        if (this.onaccessdailylog == null) {
          return;
        }
        this.onaccessdailylog(this.getDailyLogObject(data));
      } catch (e) {}
      return;
    },
    client_oncommandreply: function (data) {
      try {
        if (this.oncommandreply == null) {
          return;
        }
        this.oncommandreply(this.getCommandReplyObject(data));
      } catch (e) {}
      return;
    },
    client_oncheckconnection: function (data) {
      try {
        if (this.oncheckconnection == null) {
          return;
        }
        this.oncheckconnection(data);
      } catch (e) {}
      return;
    },
    client_onclearoutput: function (data) {
      try {
        if (this.onclearoutput == null) {
          return;
        }
        this.onclearoutput(data);
      } catch (e) {}
      return;
    },
    client_onscancode: function (data) {
      try {
        if (this.onscancode == null) {
          return;
        }
        this.onscancode(data);
      } catch (e) {}
      return;
    },
    client_onscandata: function (data) {
      try {
        if (this.onscandata == null) {
          return;
        }
        this.onscandata(data);
      } catch (e) {}
      return;
    },
    client_ondirectio: function (data) {
      try {
        if (this.ondirectio == null) {
          return;
        }
        this.ondirectio(data);
      } catch (e) {}
      return;
    },
    client_onstatusupdate: function (data) {
      try {
        if (this.onstatusupdate == null) {
          return;
        }
        this.onstatusupdate(data);
      } catch (e) {}
      return;
    },
    client_oncashdeposit: function (data) {
      try {
        if (this.oncashdeposit == null) {
          return;
        }
        this.oncashdeposit(this.getResultObject(data));
      } catch (e) {}
      return;
    },
    getResultObject: function (data) {
      return {
        status: data.status,
        sequence: data.sequence,
        service: data.service,
        accountNumber: data.account_number,
        settledAmount: data.settled_amount,
        slipNumber: data.slip_number,
        kid: data.kid,
        approvalCode: data.approval_code,
        transactionNumber: data.transaction_number,
        paymentCondition: data.payment_condition,
        voidSlipNumber: data.void_slip_number,
        balance: data.balance,
        transactionType: data.transaction_type,
        additionalSecurityInformation: data.additional_security_information,
      };
    },
    getDailyLogObject: function (data) {
      var dailylogData = {};
      dailylogData.status = data.status;
      dailylogData.service = data.service;
      dailylogData.sequence = data.sequence;
      var logList = [];
      try {
        data.daily_log.forEach(function (log) {
          var logData = {};
          if (log === 0) {
            throw logList;
          }
          logData.kid = log.kid;
          logData.salesCount = log.sales_count;
          logData.salesAmount = log.sales_amount;
          logData.voidCount = log.void_count;
          logData.voidAmount = log.void_amount;
          logList.push(logData);
        });
      } catch (e) {}
      dailylogData.dailyLog = logList;
      return dailylogData;
    },
    getCommandReplyObject: function (data) {
      return {
        status: data.status,
        command: data.command,
        data: data.data,
        string: data.string,
        service: data.service,
        sequence: data.sequence,
        accountNumber: data.account_number,
        settledAmount: data.settled_amount,
        slipNumber: data.slip_number,
        transactionNumber: data.transaction_number,
        paymentCondition: data.payment_condition,
        balance: data.balance,
        additionalSecurityInformation: data.additional_security_information,
      };
    },
    callEvent: function (eventName, data) {
      var eventReq = data;
      eventReq.type = eventName;
      return this.send(eventReq);
    },
  };
  function DeviceTerminal(deviceID, isCrypto) {
    this.deviceID = deviceID;
    this.isCrypto = isCrypto;
    this.onshutdown = null;
    this.onrestart = null;
    this.connectionObj = null;
  }
  DeviceTerminal.prototype = {
    setConnectionObject: function (connectionObj) {
      this.connectionObj = connectionObj;
    },
    shutdown: function (password, callback) {
      this.onshutdown = callback;
      var data = { type: "shutdown", password: password };
      return this.send(data);
    },
    client_onshutdown: function (data) {
      try {
        if (typeof this.onshutdown != "function") {
          return;
        }
        this.onshutdown(data);
      } catch (e) {}
      return;
    },
    restart: function (password, callback) {
      this.onrestart = callback;
      var data = { type: "restart", password: password };
      return this.send(data);
    },
    client_onrestart: function (data) {
      try {
        if (typeof this.onrestart != "function") {
          return;
        }
        this.onrestart(data);
      } catch (e) {}
      return;
    },
    send: function (data) {
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        data,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {}
      return sequence;
    },
  };
  function Display(deviceID, isCrypto, ePOSDeviceContext) {
    this.message = "";
    this.deviceID = deviceID;
    this.isCrypto = isCrypto;
    this.ePosDev = ePOSDeviceContext;
    this.timeout = 10000;
    this.onreceive = null;
    this.onerror = null;
    this.ASB_NO_RESPONSE = 1;
    this.ASB_DISPLAY_SUCCESS = 2;
    this.SCROLL_OVERWRITE = "overwrite";
    this.SCROLL_VERTICAL = "v_scroll";
    this.SCROLL_HORIZONTAL = "h_scroll";
    this.MOVE_TOP_LEFT = "top_left";
    this.MOVE_TOP_RIGHT = "top_right";
    this.MOVE_BOTTOM_LEFT = "bottom_left";
    this.MOVE_BOTTOM_RIGHT = "bottom_right";
    this.CURSOR_NONE = "none";
    this.CURSOR_UNDERLINE = "underline";
    this.BRIGHTNESS_20 = 20;
    this.BRIGHTNESS_40 = 40;
    this.BRIGHTNESS_60 = 60;
    this.BRIGHTNESS_100 = 100;
    this.MARQUEE_WALK = "walk";
    this.MARQUEE_PLACE = "place";
    this.connectionObj = null;
    this.LAYOUT_MODE_1 = 1;
    this.LAYOUT_MODE_2 = 2;
    this.LAYOUT_MODE_3 = 3;
    this.LAYOUT_MODE_4 = 4;
    this.LAYOUT_MODE_5 = 5;
    this.LAYOUT_MODE_6 = 6;
    this.LAYOUT_MODE_7 = 7;
    this.LAYOUT_MODE_8 = 8;
    this.LAYOUT_MODE_9 = 9;
    this.LAYOUT_MODE_10 = 10;
    this.LAYOUT_MODE_11 = 11;
    this.LAYOUT_MODE_12 = 12;
    this.LAYOUT_MODE_13 = 13;
    this.LAYOUT_MODE_14 = 14;
    this.LAYOUT_MODE_15 = 15;
    this.LANDSCAPE_LAYOUT_MODE_1 = 20;
    this.LANDSCAPE_LAYOUT_MODE_2 = 22;
    this.LANDSCAPE_LAYOUT_MODE_3 = 23;
    this.LANDSCAPE_LAYOUT_MODE_4 = 24;
    this.LANDSCAPE_LAYOUT_MODE_5 = 25;
    this.PORTRAIT_LAYOUT_MODE_1 = 21;
    this.PORTRAIT_LAYOUT_MODE_2 = 26;
    this.PORTRAIT_LAYOUT_MODE_3 = 27;
    this.PORTRAIT_LAYOUT_MODE_4 = 28;
    this.PORTRAIT_LAYOUT_MODE_5 = 29;
    this.PORTRAIT_LAYOUT_MODE_6 = 30;
    this.PORTRAIT_LAYOUT_MODE_7 = 31;
    this.EVEN_ROWS = "even";
    this.ODD_ROWS = "odd";
    this.ALL_ROWS = "all";
    this.SYMBOL_QRCODE_MODEL_1 = "qrcode_model_1";
    this.SYMBOL_QRCODE_MODEL_2 = "qrcode_model_2";
    this.LEVEL_L = "level_l";
    this.LEVEL_M = "level_m";
    this.LEVEL_Q = "level_q";
    this.LEVEL_H = "level_h";
    this.LEVEL_DEFAULT = "default";
  }
  Display.prototype.setConnectionObject = function (connectionObj) {
    this.connectionObj = connectionObj;
  };
  Display.prototype.reset = function () {
    try {
      this.message += "<reset />";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.createWindow = function (
    number,
    x,
    y,
    width,
    hight,
    scrollMode
  ) {
    try {
      var s = "";
      s += getIntAttr("number", number, 1, 4);
      s += getIntAttr("x", x, 1, 44);
      s += getIntAttr("y", y, 1, 19);
      s += getIntAttr("width", width, 1, 44);
      s += getIntAttr("height", hight, 1, 19);
      s += getEnumAttr("scrollmode", scrollMode, regexScrollMode);
      this.message += "<window" + s + "/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.destroyWindow = function (number) {
    try {
      var s = "";
      s += getIntAttr("number", number, 1, 4);
      this.message += "<window" + s + ' destroy="true"/>';
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.setCurrentWindow = function (number) {
    try {
      var s = "";
      s += getIntAttr("number", number, 1, 4);
      this.message += "<window" + s + "/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.setCursorPosition = function () {
    try {
      var s = "";
      s += getIntAttr("x", arguments[0], 1, 44);
      s += getIntAttr("y", arguments[1], 1, 19);
      this.message += "<cursor" + s + "/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.moveCursorPosition = function () {
    try {
      var s = "";
      s += getEnumAttr("moveto", arguments[0], regexMoveto);
      this.message += "<cursor" + s + "/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.setCursorType = function (underline) {
    try {
      var s = "";
      s += getEnumAttr("type", underline, regexUnderline);
      this.message += "<cursor" + s + "/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addText = function () {
    try {
      var s = "";
      switch (arguments.length) {
        case 1:
          break;
        case 2:
          if (arguments[1] != undefined) {
            s += ' lang="' + arguments[1] + '"';
          }
          break;
        case 3:
          if (arguments[1] != undefined && arguments[2] != undefined) {
            s += getIntAttr("x", arguments[1], 1, 44);
            s += getIntAttr("y", arguments[2], 1, 19);
          }
          break;
        case 4:
          if (arguments[1] != undefined && arguments[2] != undefined) {
            s += getIntAttr("x", arguments[1], 1, 44);
            s += getIntAttr("y", arguments[2], 1, 19);
          }
          if (arguments[3] != undefined) {
            s += ' lang="' + arguments[3] + '"';
          }
          break;
        case 7:
          if (arguments[1] != undefined && arguments[2] != undefined) {
            s += getIntAttr("x", arguments[1], 1, 44);
            s += getIntAttr("y", arguments[2], 1, 19);
          }
          if (arguments[3] != undefined) {
            s += ' lang="' + arguments[3] + '"';
          }
          if (
            arguments[4] != undefined &&
            arguments[5] != undefined &&
            arguments[6] != undefined
          ) {
            var tmp = getIntAttr("r", arguments[4], 0, 255);
            tmp = getIntAttr("g", arguments[5], 0, 255);
            tmp = getIntAttr("b", arguments[6], 0, 255);
            var rHex = ("00" + Number(arguments[4]).toString(16)).slice(-2);
            var gHex = ("00" + Number(arguments[5]).toString(16)).slice(-2);
            var bHex = ("00" + Number(arguments[6]).toString(16)).slice(-2);
            var color = "#" + rHex + gHex + bHex;
            s += ' color="' + color + '"';
          }
          break;
        default:
          throw new Error("Parameters are invalid");
          break;
      }
      this.message +=
        "<text" + s + ">" + escapeMarkup(arguments[0]) + "</text>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addReverseText = function () {
    try {
      var s = "";
      switch (arguments.length) {
        case 1:
          s += getBoolAttr("reverse", true);
          break;
        case 2:
          s += ' lang="' + arguments[1] + '"';
          s += getBoolAttr("reverse", true);
          break;
        case 3:
          s += getIntAttr("x", arguments[1], 1, 20);
          s += getIntAttr("y", arguments[2], 1, 2);
          s += getBoolAttr("reverse", true);
          break;
        case 4:
          s += getIntAttr("x", arguments[1], 1, 20);
          s += getIntAttr("y", arguments[2], 1, 2);
          s += ' lang="' + arguments[3] + '"';
          s += getBoolAttr("reverse", true);
          break;
        default:
          throw new Error("Parameters are invalid");
          break;
      }
      this.message +=
        "<text" + s + ">" + escapeMarkup(arguments[0]) + "</text>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.clearWindow = function () {
    try {
      this.message += "<clear/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.setBlink = function (interval) {
    try {
      var s = "";
      s += getUShortAttr("interval", interval);
      this.message += "<blink" + s + "/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.setBrightness = function (value) {
    try {
      var s = "";
      s += getEnumAttr("value", value, regexBrightness);
      this.message += "<brightness" + s + "/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addMarquee = function (
    text,
    format,
    uwait,
    rwait,
    repeat,
    lang
  ) {
    try {
      var s = "";
      s += getEnumAttr("format", format, regexMarquee);
      s += getIntAttr("uwait", uwait, 0, 2000);
      s += getIntAttr("rwait", rwait, 100, 2000);
      s += getIntAttr("repeat", repeat, 0, 127);
      if (typeof lang !== "undefined") {
        s += ' lang="' + lang + '"';
      }
      this.message += "<marquee" + s + ">" + escapeMarkup(text) + "</marquee>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.showClock = function () {
    try {
      this.message += "<clock/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addCommand = function (text) {
    try {
      this.message += "<command>" + toHexBinary(text) + "</command>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addCreateScreen = function (mode) {
    try {
      var s = "";
      s += getIntAttr("mode", mode, 1, 15);
      this.message += "<screen" + s + "/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addCreateScreenCustom = function (mode, column, row) {
    try {
      var s = "";
      s += getIntAttr("mode", mode, 20, 31);
      s += getIntAttr("column", column, 1, 44);
      s += getIntAttr("row", row, 1, 19);
      this.message += "<screen" + s + "/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addBackgroundColor = function (row, r, g, b) {
    try {
      var s = "";
      s += getEnumAttr("row", row, regexRow);
      var tmp = getIntAttr("r", r, 0, 255);
      tmp = getIntAttr("g", g, 0, 255);
      tmp = getIntAttr("b", b, 0, 255);
      var rHex = ("00" + Number(r).toString(16)).slice(-2);
      var gHex = ("00" + Number(g).toString(16)).slice(-2);
      var bHex = ("00" + Number(b).toString(16)).slice(-2);
      var color = "#" + rHex + gHex + bHex;
      s += ' color="' + color + '"';
      this.message += "<backgroundcolor" + s + "/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addStartSlideShow = function (interval) {
    try {
      var s = "";
      s += getIntAttr("interval", interval, 200, 51000);
      this.message += "<slideshow" + s + ' stop="false"/>';
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addStopSlideShow = function () {
    try {
      this.message += '<slideshow stop="true"/>';
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addSymbol = function (
    data,
    type,
    level,
    width,
    height,
    dotX,
    dotY,
    quietZone
  ) {
    try {
      var s = "";
      s += getEnumAttr("type", type, regexSymbol);
      s += getEnumAttr("level", level, regexLevel);
      s += getIntAttr("width", width, 1, 255);
      s += getIntAttr("dotx", dotX, 0, 799);
      s += getIntAttr("doty", dotY, 0, 799);
      s += getEnumAttr("quietzone", quietZone, regexQuietZone);
      this.message +=
        "<symbol" + s + ">" + escapeControl(escapeMarkup(data)) + "</symbol>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addDownloadImage = function (
    key1,
    key2,
    dotX,
    dotY,
    width,
    height
  ) {
    try {
      var s = "";
      s += getIntAttr("key1", key1, 0, 255);
      s += getIntAttr("key2", key2, 0, 255);
      s += getIntAttr("dotx", dotX, 0, 799);
      s += getIntAttr("doty", dotY, 0, 799);
      s += getIntAttr("width", width, 0, 1440);
      s += getIntAttr("height", height, 0, 1440);
      this.message += "<downloadimage" + s + "/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addRegisterDownloadImage = function (data, key1, key2) {
    try {
      var s = "";
      s += getIntAttr("key1", key1, 0, 255);
      s += getIntAttr("key2", key2, 0, 255);
      this.message +=
        "<registerdownloadimage" +
        s +
        ">" +
        toBase64Binary(data) +
        "</registerdownloadimage>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addNVImage = function (
    key1,
    key2,
    dotX,
    dotY,
    width,
    height
  ) {
    try {
      var s = "";
      s += getIntAttr("key1", key1, 0, 255);
      s += getIntAttr("key2", key2, 0, 255);
      s += getIntAttr("dotx", dotX, 0, 799);
      s += getIntAttr("doty", dotY, 0, 799);
      s += getIntAttr("width", width, 0, 1440);
      s += getIntAttr("height", height, 0, 1440);
      this.message += "<nvimage" + s + "/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addClearImage = function () {
    try {
      this.message += "<clearimage/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.addClearSymbol = function () {
    try {
      this.message += "<clearsymbol/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.createTextArea = function (
    number,
    x,
    y,
    width,
    height,
    scrollMode
  ) {
    try {
      var s = "";
      s += getIntAttr("number", number, 1, 4);
      s += getIntAttr("x", x, 1, 44);
      s += getIntAttr("y", y, 1, 19);
      s += getIntAttr("width", width, 1, 44);
      s += getIntAttr("height", height, 1, 19);
      s += getEnumAttr("scrollmode", scrollMode, regexScrollMode);
      this.message += "<textarea" + s + "/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.destroyTextArea = function (number) {
    try {
      var s = "";
      s += getIntAttr("number", number, 1, 4);
      this.message += "<textarea" + s + ' destroy="true"/>';
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.setCurrentTextArea = function (number) {
    try {
      var s = "";
      s += getIntAttr("number", number, 1, 4);
      this.message += "<textarea" + s + "/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.clearTextArea = function () {
    try {
      this.message += "<clear/>";
    } catch (e) {
      throw e;
    }
    return this;
  };
  Display.prototype.send = function () {
    var sq = -1;
    if (!this.ePosDev.eposprint && this.connectionObj.isUsableDeviceIF()) {
      try {
        var xml = this.toString();
        var data = { type: "display", timeout: this.timeout, displaydata: xml };
        var eposmsg = MessageFactory.getDeviceDataMessage(
          this.deviceID,
          data,
          this.isCrypto
        );
        this.connectionObj.emit(eposmsg);
        sq = eposmsg.sequence;
        this.message = "";
      } catch (e) {
        sq = -1;
      }
    } else {
      var self = this,
        address =
          this.connectionObj.getAddressWithProtocol() +
          "/cgi-bin/eposDisp/service.cgi?devid=" +
          this.deviceID +
          "&timeout=" +
          this.timeout,
        soap,
        xhr,
        tid,
        res,
        success,
        code,
        status;
      res = {};
      soap =
        '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">';
      soap += "<s:Body>" + this.toString() + "</s:Body></s:Envelope>";
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        if (!("withCredentials" in xhr) && window.XDomainRequest) {
          xhr = new XDomainRequest();
          xhr.open("POST", address, true);
          xhr.onload = function () {
            res = xhr.responseText;
            if (/response/.test(res)) {
              success = /success\s*=\s*"\s*(1|true)\s*"/.test(res);
              code = res.match(/code\s*=\s*"\s*(\S*)\s*"/) ? RegExp.$1 : "";
              status = res.match(/status\s*=\s*"\s*(\d+)\s*"/)
                ? parseInt(RegExp.$1)
                : 0;
              self.fireReceiveEvent(success, code, status, 0);
            } else {
              self.fireErrorEvent(0, xhr.responseText, 0);
            }
          };
          xhr.onerror = function () {
            self.fireErrorEvent(0, xhr.responseText, 0);
          };
          xhr.onprogress = function () {};
          xhr.ontimeout = xhr.onerror;
          xhr.timeout = self.timeout;
          xhr.send(soap);
        } else {
          xhr.open("POST", address, true);
          xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
          xhr.setRequestHeader(
            "If-Modified-Since",
            "Thu, 01 Jan 1970 00:00:00 GMT"
          );
          xhr.setRequestHeader("SOAPAction", '""');
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              clearTimeout(tid);
              if (xhr.status == 200 && xhr.responseXML) {
                res = xhr.responseXML.getElementsByTagName("response");
                if (res.length > 0) {
                  success = /^(1|true)$/.test(res[0].getAttribute("success"));
                  code = res[0].hasAttribute("code")
                    ? res[0].getAttribute("code")
                    : "";
                  status = res[0].hasAttribute("status")
                    ? parseInt(res[0].getAttribute("status"))
                    : 0;
                  self.fireReceiveEvent(success, code, status, 0);
                } else {
                  self.fireErrorEvent(xhr.status, xhr.responseText, 0);
                }
              } else {
                self.fireErrorEvent(xhr.status, xhr.responseText, 0);
              }
            }
          };
          tid = setTimeout(function () {
            xhr.abort();
          }, this.timeout);
          xhr.send(soap);
        }
        this.message = "";
      } else {
        throw new Error("XMLHttpRequest is not supported");
      }
      sq = 0;
    }
    return sq;
  };
  Display.prototype.fireReceiveEvent = function (success, code, status, sq) {
    if (code == "EX_ENPC_TIMEOUT") {
      code = "ERROR_DEVICE_BUSY";
    }
    if (this.onreceive) {
      this.onreceive({ success: success, code: code, status: status }, sq);
    }
  };
  Display.prototype.fireErrorEvent = function (status, responseText, sq) {
    if (this.onerror) {
      this.onerror({ status: 0, responseText: this.ASB_NO_RESPONSE }, sq);
    }
    this.ePosDev.cleanup();
  };
  Display.prototype.client_onxmlresult = function (res, sq) {
    if (res) {
      var xml = res.resultdata;
      var success = /success\s*=\s*"\s*(1|true)\s*"/.test(xml);
      xml.match(/code\s*=\s*"\s*(\S*)\s*"/);
      var code = RegExp.$1;
      xml.match(/status\s*=\s*"\s*(\d+)\s*"/);
      var status = parseInt(RegExp.$1);
      if (this.onreceive) {
        this.onreceive({ success: success, code: code, status: status }, sq);
      }
    } else {
      if (this.onerror) {
        this.onerror({ status: 0, responseText: this.ASB_NO_RESPONSE }, sq);
      }
      this.ePosDev.cleanup();
    }
  };
  Display.prototype.toString = function () {
    var epos =
      '<epos-display xmlns="http://www.epson-pos.com/schemas/2012/09/epos-display">' +
      this.message +
      "</epos-display>";
    return epos;
  };
  Display.prototype.setXmlString = function (xml) {
    this.message = xml;
  };
  Display.prototype.getXmlString = function () {
    return this.message;
  };
  Display.prototype.callEvent = function (eventName, data) {
    var eventReq = { type: eventName, data: data };
    var eposmsg = MessageFactory.getDeviceDataMessage(
      this.deviceID,
      data,
      this.isCrypto
    );
    var sequence = -1;
    try {
      this.connectionObj.emit(eposmsg);
      sequence = eposmsg.sequence;
    } catch (e) {}
    return sequence;
  };
  var regexBrightness = /^(20|40|60|100)$/;
  var regexScrollMode = /^(overwrite|v_scroll|h_scroll)$/;
  var regexMoveto = /^(top_left|top_right|bottom_left|bottom_right)$/;
  var regexUnderline = /^(none|underline)$/;
  var regexMarquee = /^(walk|place)$/;
  var regexRow = /^([1-9]|1[0-9]|even|odd|all)$/;
  var regexSymbol = /^(qrcode_(model_[12]))$/;
  var regexLevel = /^(level_[lmqh]|default)$/;
  var regexQuietZone = /^(true|false)$/;
  function OtherPeripheral(deviceID, isCrypto) {
    this.deviceID = deviceID;
    this.isCrypto = isCrypto;
    this.connectionObj = null;
  }
  OtherPeripheral.prototype = {
    setConnectionObject: function (connectionObj) {
      this.connectionObj = connectionObj;
    },
    send: function (methodName, data) {
      var _data = {};
      for (var key in data) {
        _data[key] = data[key];
      }
      _data.type = methodName;
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        _data,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {}
      return sequence;
    },
    client_onreceive: function (data) {
      try {
        var eventData = data;
        delete eventData.type;
        this.onreceive(data.type, eventData);
      } catch (e) {}
      return;
    },
    callEvent: function (eventName, data) {
      var eventReq = { type: eventName, data: data };
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        data,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {}
      return sequence;
    },
  };
  function Keyboard(deviceID, isCrypto) {
    this.VK_CANCEL = 3;
    this.VK_BACK = 8;
    this.VK_TAB = 9;
    this.VK_RETURN = 13;
    this.VK_SHIFT = 16;
    this.VK_CONTROL = 17;
    this.VK_MENU = 18;
    this.VK_PAUSE = 19;
    this.VK_CAPITAL = 20;
    this.VK_KANA = 21;
    this.VK_ESCAPE = 27;
    this.VK_CONVERT = 28;
    this.VK_NONCONVERT = 29;
    this.VK_SPACE = 32;
    this.VK_PRIOR = 33;
    this.VK_NEXT = 34;
    this.VK_END = 35;
    this.VK_HOME = 36;
    this.VK_LEFT = 37;
    this.VK_UP = 38;
    this.VK_RIGHT = 39;
    this.VK_DOWN = 40;
    this.VK_INSERT = 45;
    this.VK_DELETE = 46;
    this.VK_0 = 48;
    this.VK_1 = 49;
    this.VK_2 = 50;
    this.VK_3 = 51;
    this.VK_4 = 52;
    this.VK_5 = 53;
    this.VK_6 = 54;
    this.VK_7 = 55;
    this.VK_8 = 56;
    this.VK_9 = 57;
    this.VK_A = 65;
    this.VK_B = 66;
    this.VK_C = 67;
    this.VK_D = 68;
    this.VK_E = 69;
    this.VK_F = 70;
    this.VK_G = 71;
    this.VK_H = 72;
    this.VK_I = 73;
    this.VK_J = 74;
    this.VK_K = 75;
    this.VK_L = 76;
    this.VK_M = 77;
    this.VK_N = 78;
    this.VK_O = 79;
    this.VK_P = 80;
    this.VK_Q = 81;
    this.VK_R = 82;
    this.VK_S = 83;
    this.VK_T = 84;
    this.VK_U = 85;
    this.VK_V = 86;
    this.VK_W = 87;
    this.VK_X = 88;
    this.VK_Y = 89;
    this.VK_Z = 90;
    this.VK_LWIN = 91;
    this.VK_RWIN = 92;
    this.VK_APPS = 93;
    this.VK_NUMPAD0 = 96;
    this.VK_NUMPAD1 = 97;
    this.VK_NUMPAD2 = 98;
    this.VK_NUMPAD3 = 99;
    this.VK_NUMPAD4 = 100;
    this.VK_NUMPAD5 = 101;
    this.VK_NUMPAD6 = 102;
    this.VK_NUMPAD7 = 103;
    this.VK_NUMPAD8 = 104;
    this.VK_NUMPAD9 = 105;
    this.VK_MULTIPLY = 106;
    this.VK_ADD = 107;
    this.VK_SEPARATOR = 108;
    this.VK_SUBTRACT = 109;
    this.VK_DECIMAL = 110;
    this.VK_DIVIDE = 111;
    this.VK_F1 = 112;
    this.VK_F2 = 113;
    this.VK_F3 = 114;
    this.VK_F4 = 115;
    this.VK_F5 = 116;
    this.VK_F6 = 117;
    this.VK_F7 = 118;
    this.VK_F8 = 119;
    this.VK_F9 = 120;
    this.VK_F10 = 121;
    this.VK_F11 = 122;
    this.VK_F12 = 123;
    this.VK_NUMLOCK = 144;
    this.VK_SCROLL = 145;
    this.VK_LSHIFT = 160;
    this.VK_RSHIFT = 161;
    this.VK_LCONTROL = 162;
    this.VK_RCONTROL = 163;
    this.VK_LMENU = 164;
    this.VK_RMENU = 165;
    this.VK_OEM_1 = 186;
    this.VK_OEM_PLUS = 187;
    this.VK_OEM_COMMA = 188;
    this.VK_OEM_MINUS = 189;
    this.VK_OEM_PERIOD = 190;
    this.VK_OEM_2 = 191;
    this.VK_OEM_3 = 192;
    this.VK_OEM_4 = 219;
    this.VK_OEM_5 = 220;
    this.VK_OEM_6 = 221;
    this.VK_OEM_7 = 222;
    this.VK_OEM_102 = 226;
    this.VK_OEM_ATTN = 240;
    this.deviceID = deviceID;
    this.isCrypto = isCrypto;
    this.connectionObj = null;
  }
  Keyboard.prototype = {
    setConnectionObject: function (connectionObj) {
      this.connectionObj = connectionObj;
    },
    client_onkeypress: function (data) {
      try {
        if (this.onkeypress == null) {
          return;
        }
        this.onkeypress(data);
      } catch (e) {}
      return;
    },
    client_onstring: function (data) {
      try {
        if (this.onstring == null) {
          return;
        }
        this.onstring(data);
      } catch (e) {}
      return;
    },
    setPrefix: function (keycodes) {
      var data = { type: "setprefix" };
      if (typeof keycodes == "object") {
        if (keycodes.length == 0) {
          return -1;
        }
        data.keycodes = keycodes;
      } else {
        if (keycodes == null || keycodes == "") {
          return -1;
        }
        data.keycodes = [keycodes];
      }
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        data,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {}
      return sequence;
    },
    callEvent: function (eventName, data) {
      var eventReq = data;
      eventReq.type = eventName;
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        eventReq,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {}
      return sequence;
    },
  };
  function MSR(deviceID, isCrypto) {
    this.deviceID = deviceID;
    this.isCrypto = isCrypto;
    this.connectionObj = null;
  }
  MSR.prototype = {
    setConnectionObject: function (connectionObj) {
      this.connectionObj = connectionObj;
    },
    client_ondata: function (data) {
      try {
        if (this.ondata == null) {
          return;
        }
        this.ondata(data);
      } catch (e) {}
      return;
    },
    callEvent: function (eventName, data) {
      var eventReq = data;
      eventReq.type = eventName;
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        eventReq,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {}
      return sequence;
    },
  };
  /*! Based JavaScript is ePOS-Print API Version 5.0.0 */
  function ePOSBuilder() {
    this.message = "";
    this.halftone = 0;
    this.brightness = 1;
    this.force = false;
    this.FONT_A = "font_a";
    this.FONT_B = "font_b";
    this.FONT_C = "font_c";
    this.FONT_D = "font_d";
    this.FONT_E = "font_e";
    this.FONT_SPECIAL_A = "special_a";
    this.FONT_SPECIAL_B = "special_b";
    this.ALIGN_LEFT = "left";
    this.ALIGN_CENTER = "center";
    this.ALIGN_RIGHT = "right";
    this.COLOR_NONE = "none";
    this.COLOR_1 = "color_1";
    this.COLOR_2 = "color_2";
    this.COLOR_3 = "color_3";
    this.COLOR_4 = "color_4";
    this.FEED_PEELING = "peeling";
    this.FEED_CUTTING = "cutting";
    this.FEED_CURRENT_TOF = "current_tof";
    this.FEED_NEXT_TOF = "next_tof";
    this.MODE_MONO = "mono";
    this.MODE_GRAY16 = "gray16";
    this.BARCODE_UPC_A = "upc_a";
    this.BARCODE_UPC_E = "upc_e";
    this.BARCODE_EAN13 = "ean13";
    this.BARCODE_JAN13 = "jan13";
    this.BARCODE_EAN8 = "ean8";
    this.BARCODE_JAN8 = "jan8";
    this.BARCODE_CODE39 = "code39";
    this.BARCODE_ITF = "itf";
    this.BARCODE_CODABAR = "codabar";
    this.BARCODE_CODE93 = "code93";
    this.BARCODE_CODE128 = "code128";
    this.BARCODE_GS1_128 = "gs1_128";
    this.BARCODE_GS1_DATABAR_OMNIDIRECTIONAL = "gs1_databar_omnidirectional";
    this.BARCODE_GS1_DATABAR_TRUNCATED = "gs1_databar_truncated";
    this.BARCODE_GS1_DATABAR_LIMITED = "gs1_databar_limited";
    this.BARCODE_GS1_DATABAR_EXPANDED = "gs1_databar_expanded";
    this.BARCODE_CODE128_AUTO = "code128_auto";
    this.HRI_NONE = "none";
    this.HRI_ABOVE = "above";
    this.HRI_BELOW = "below";
    this.HRI_BOTH = "both";
    this.SYMBOL_PDF417_STANDARD = "pdf417_standard";
    this.SYMBOL_PDF417_TRUNCATED = "pdf417_truncated";
    this.SYMBOL_QRCODE_MODEL_1 = "qrcode_model_1";
    this.SYMBOL_QRCODE_MODEL_2 = "qrcode_model_2";
    this.SYMBOL_QRCODE_MICRO = "qrcode_micro";
    this.SYMBOL_MAXICODE_MODE_2 = "maxicode_mode_2";
    this.SYMBOL_MAXICODE_MODE_3 = "maxicode_mode_3";
    this.SYMBOL_MAXICODE_MODE_4 = "maxicode_mode_4";
    this.SYMBOL_MAXICODE_MODE_5 = "maxicode_mode_5";
    this.SYMBOL_MAXICODE_MODE_6 = "maxicode_mode_6";
    this.SYMBOL_GS1_DATABAR_STACKED = "gs1_databar_stacked";
    this.SYMBOL_GS1_DATABAR_STACKED_OMNIDIRECTIONAL =
      "gs1_databar_stacked_omnidirectional";
    this.SYMBOL_GS1_DATABAR_EXPANDED_STACKED = "gs1_databar_expanded_stacked";
    this.SYMBOL_AZTECCODE_FULLRANGE = "azteccode_fullrange";
    this.SYMBOL_AZTECCODE_COMPACT = "azteccode_compact";
    this.SYMBOL_DATAMATRIX_SQUARE = "datamatrix_square";
    this.SYMBOL_DATAMATRIX_RECTANGLE_8 = "datamatrix_rectangle_8";
    this.SYMBOL_DATAMATRIX_RECTANGLE_12 = "datamatrix_rectangle_12";
    this.SYMBOL_DATAMATRIX_RECTANGLE_16 = "datamatrix_rectangle_16";
    this.LEVEL_0 = "level_0";
    this.LEVEL_1 = "level_1";
    this.LEVEL_2 = "level_2";
    this.LEVEL_3 = "level_3";
    this.LEVEL_4 = "level_4";
    this.LEVEL_5 = "level_5";
    this.LEVEL_6 = "level_6";
    this.LEVEL_7 = "level_7";
    this.LEVEL_8 = "level_8";
    this.LEVEL_L = "level_l";
    this.LEVEL_M = "level_m";
    this.LEVEL_Q = "level_q";
    this.LEVEL_H = "level_h";
    this.LEVEL_DEFAULT = "default";
    this.LINE_THIN = "thin";
    this.LINE_MEDIUM = "medium";
    this.LINE_THICK = "thick";
    this.LINE_THIN_DOUBLE = "thin_double";
    this.LINE_MEDIUM_DOUBLE = "medium_double";
    this.LINE_THICK_DOUBLE = "thick_double";
    this.DIRECTION_LEFT_TO_RIGHT = "left_to_right";
    this.DIRECTION_BOTTOM_TO_TOP = "bottom_to_top";
    this.DIRECTION_RIGHT_TO_LEFT = "right_to_left";
    this.DIRECTION_TOP_TO_BOTTOM = "top_to_bottom";
    this.CUT_NO_FEED = "no_feed";
    this.CUT_FEED = "feed";
    this.CUT_RESERVE = "reserve";
    this.FULL_CUT_NO_FEED = "no_feed_fullcut";
    this.FULL_CUT_FEED = "feed_fullcut";
    this.FULL_CUT_RESERVE = "reserve_fullcut";
    this.DRAWER_1 = "drawer_1";
    this.DRAWER_2 = "drawer_2";
    this.PULSE_100 = "pulse_100";
    this.PULSE_200 = "pulse_200";
    this.PULSE_300 = "pulse_300";
    this.PULSE_400 = "pulse_400";
    this.PULSE_500 = "pulse_500";
    this.PATTERN_NONE = "none";
    this.PATTERN_0 = "pattern_0";
    this.PATTERN_1 = "pattern_1";
    this.PATTERN_2 = "pattern_2";
    this.PATTERN_3 = "pattern_3";
    this.PATTERN_4 = "pattern_4";
    this.PATTERN_5 = "pattern_5";
    this.PATTERN_6 = "pattern_6";
    this.PATTERN_7 = "pattern_7";
    this.PATTERN_8 = "pattern_8";
    this.PATTERN_9 = "pattern_9";
    this.PATTERN_10 = "pattern_10";
    this.PATTERN_A = "pattern_a";
    this.PATTERN_B = "pattern_b";
    this.PATTERN_C = "pattern_c";
    this.PATTERN_D = "pattern_d";
    this.PATTERN_E = "pattern_e";
    this.PATTERN_ERROR = "error";
    this.PATTERN_PAPER_END = "paper_end";
    this.LAYOUT_RECEIPT = "receipt";
    this.LAYOUT_RECEIPT_BM = "receipt_bm";
    this.LAYOUT_LABEL = "label";
    this.LAYOUT_LABEL_BM = "label_bm";
    this.HALFTONE_DITHER = 0;
    this.HALFTONE_ERROR_DIFFUSION = 1;
    this.HALFTONE_THRESHOLD = 2;
  }
  ePOSBuilder.prototype.addText = function (data) {
    this.message += "<text>" + escapeMarkup(data) + "</text>";
    return this;
  };
  ePOSBuilder.prototype.addTextLang = function (lang) {
    this.message += '<text lang="' + lang + '"/>';
    return this;
  };
  ePOSBuilder.prototype.addTextAlign = function (align) {
    var s = "";
    s += getEnumAttr("align", align, regexAlign);
    this.message += "<text" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addTextRotate = function (rotate) {
    var s = "";
    s += getBoolAttr("rotate", rotate);
    this.message += "<text" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addTextLineSpace = function (linespc) {
    var s = "";
    s += getUByteAttr("linespc", linespc);
    this.message += "<text" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addTextFont = function (font) {
    var s = "";
    s += getEnumAttr("font", font, regexFont);
    this.message += "<text" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addTextSmooth = function (smooth) {
    var s = "";
    s += getBoolAttr("smooth", smooth);
    this.message += "<text" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addTextDouble = function (dw, dh) {
    var s = "";
    if (dw !== undefined) {
      s += getBoolAttr("dw", dw);
    }
    if (dh !== undefined) {
      s += getBoolAttr("dh", dh);
    }
    this.message += "<text" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addTextSize = function (width, height) {
    var s = "";
    if (width !== undefined) {
      s += getIntAttr("width", width, 1, 8);
    }
    if (height !== undefined) {
      s += getIntAttr("height", height, 1, 8);
    }
    this.message += "<text" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addTextStyle = function (reverse, ul, em, color) {
    var s = "";
    if (reverse !== undefined) {
      s += getBoolAttr("reverse", reverse);
    }
    if (ul !== undefined) {
      s += getBoolAttr("ul", ul);
    }
    if (em !== undefined) {
      s += getBoolAttr("em", em);
    }
    if (color !== undefined) {
      s += getEnumAttr("color", color, regexColor);
    }
    this.message += "<text" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addTextPosition = function (x) {
    var s = "";
    s += getUShortAttr("x", x);
    this.message += "<text" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addTextVPosition = function (y) {
    var s = "";
    s += getUShortAttr("y", y);
    this.message += "<text" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addFeedUnit = function (unit) {
    var s = "";
    s += getUByteAttr("unit", unit);
    this.message += "<feed" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addFeedLine = function (line) {
    var s = "";
    s += getUByteAttr("line", line);
    this.message += "<feed" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addFeed = function () {
    this.message += "<feed/>";
    return this;
  };
  ePOSBuilder.prototype.addFeedPosition = function (pos) {
    var s = "";
    s += getEnumAttr("pos", pos, regexFeed);
    this.message += "<feed" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addImage = function (
    context,
    x,
    y,
    width,
    height,
    color,
    mode
  ) {
    var s = "",
      ht = this.halftone,
      br = this.brightness,
      imgdata,
      raster;
    getUShortAttr("x", x);
    getUShortAttr("y", y);
    s += getUShortAttr("width", width);
    s += getUShortAttr("height", height);
    if (color !== undefined) {
      s += getEnumAttr("color", color, regexColor);
    }
    if (mode !== undefined) {
      s += getEnumAttr("mode", mode, regexMode);
    }
    if (isNaN(ht) || ht < 0 || ht > 2) {
      throw new Error('Property "halftone" is invalid');
    }
    if (isNaN(br) || br < 0.1 || br > 10) {
      throw new Error('Property "brightness" is invalid');
    }
    imgdata = context.getImageData(x, y, width, height);
    raster =
      mode == this.MODE_GRAY16
        ? toGrayImage(imgdata, br)
        : toMonoImage(imgdata, ht, br);
    this.message += "<image" + s + ">" + toBase64Binary(raster) + "</image>";
    return this;
  };
  ePOSBuilder.prototype.addLogo = function (key1, key2) {
    var s = "";
    s += getUByteAttr("key1", key1);
    s += getUByteAttr("key2", key2);
    this.message += "<logo" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addBarcode = function (
    data,
    type,
    hri,
    font,
    width,
    height
  ) {
    var s = "";
    s += getEnumAttr("type", type, regexBarcode);
    if (hri !== undefined) {
      s += getEnumAttr("hri", hri, regexHri);
    }
    if (font !== undefined) {
      s += getEnumAttr("font", font, regexFont);
    }
    if (width !== undefined) {
      s += getUByteAttr("width", width);
    }
    if (height !== undefined) {
      s += getUByteAttr("height", height);
    }
    this.message +=
      "<barcode" + s + ">" + escapeControl(escapeMarkup(data)) + "</barcode>";
    return this;
  };
  ePOSBuilder.prototype.addSymbol = function (
    data,
    type,
    level,
    width,
    height,
    size
  ) {
    var s = "";
    s += getEnumAttr("type", type, regexSymbol);
    if (level !== undefined) {
      s += getEnumIntAttr("level", level, regexLevel, 0, 255);
    }
    if (width !== undefined) {
      s += getUByteAttr("width", width);
    }
    if (height !== undefined) {
      s += getUByteAttr("height", height);
    }
    if (size !== undefined) {
      s += getUShortAttr("size", size);
    }
    this.message +=
      "<symbol" + s + ">" + escapeControl(escapeMarkup(data)) + "</symbol>";
    return this;
  };
  ePOSBuilder.prototype.addHLine = function (x1, x2, style) {
    var s = "";
    s += getUShortAttr("x1", x1);
    s += getUShortAttr("x2", x2);
    if (style !== undefined) {
      s += getEnumAttr("style", style, regexLine);
    }
    this.message += "<hline" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addVLineBegin = function (x, style) {
    var s = "";
    s += getUShortAttr("x", x);
    if (style !== undefined) {
      s += getEnumAttr("style", style, regexLine);
    }
    this.message += "<vline-begin" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addVLineEnd = function (x, style) {
    var s = "";
    s += getUShortAttr("x", x);
    if (style !== undefined) {
      s += getEnumAttr("style", style, regexLine);
    }
    this.message += "<vline-end" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addPageBegin = function () {
    this.message += "<page>";
    return this;
  };
  ePOSBuilder.prototype.addPageEnd = function () {
    this.message += "</page>";
    return this;
  };
  ePOSBuilder.prototype.addPageArea = function (x, y, width, height) {
    var s = "";
    s += getUShortAttr("x", x);
    s += getUShortAttr("y", y);
    s += getUShortAttr("width", width);
    s += getUShortAttr("height", height);
    this.message += "<area" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addPageDirection = function (dir) {
    var s = "";
    s += getEnumAttr("dir", dir, regexDirection);
    this.message += "<direction" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addPagePosition = function (x, y) {
    var s = "";
    s += getUShortAttr("x", x);
    s += getUShortAttr("y", y);
    this.message += "<position" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addPageLine = function (x1, y1, x2, y2, style) {
    var s = "";
    s += getUShortAttr("x1", x1);
    s += getUShortAttr("y1", y1);
    s += getUShortAttr("x2", x2);
    s += getUShortAttr("y2", y2);
    if (style !== undefined) {
      s += getEnumAttr("style", style, regexLine);
    }
    this.message += "<line" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addPageRectangle = function (x1, y1, x2, y2, style) {
    var s = "";
    s += getUShortAttr("x1", x1);
    s += getUShortAttr("y1", y1);
    s += getUShortAttr("x2", x2);
    s += getUShortAttr("y2", y2);
    if (style !== undefined) {
      s += getEnumAttr("style", style, regexLine);
    }
    this.message += "<rectangle" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addRotateBegin = function () {
    this.message += "<rotate-begin/>";
    return this;
  };
  ePOSBuilder.prototype.addRotateEnd = function () {
    this.message += "<rotate-end/>";
    return this;
  };
  ePOSBuilder.prototype.addCut = function (type) {
    var s = "";
    if (type !== undefined) {
      s += getEnumAttr("type", type, regexCut);
    }
    this.message += "<cut" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addPulse = function (drawer, time) {
    var s = "";
    if (drawer !== undefined) {
      s += getEnumAttr("drawer", drawer, regexDrawer);
    }
    if (time !== undefined) {
      s += getEnumAttr("time", time, regexPulse);
    }
    this.message += "<pulse" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addSound = function (pattern, repeat, cycle) {
    var s = "";
    if (pattern !== undefined) {
      s += getEnumAttr("pattern", pattern, regexPattern);
    }
    if (repeat !== undefined) {
      s += getUByteAttr("repeat", repeat);
    }
    if (cycle !== undefined) {
      s += getUShortAttr("cycle", cycle);
    }
    this.message += "<sound" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addLayout = function (
    type,
    width,
    height,
    margin_top,
    margin_bottom,
    offset_cut,
    offset_label
  ) {
    var s = "";
    s += getEnumAttr("type", type, regexLayout);
    if (width !== undefined) {
      s += getUShortAttr("width", width);
    }
    if (height !== undefined) {
      s += getUShortAttr("height", height);
    }
    if (margin_top !== undefined) {
      s += getShortAttr("margin-top", margin_top);
    }
    if (margin_bottom !== undefined) {
      s += getShortAttr("margin-bottom", margin_bottom);
    }
    if (offset_cut !== undefined) {
      s += getShortAttr("offset-cut", offset_cut);
    }
    if (offset_label !== undefined) {
      s += getShortAttr("offset-label", offset_label);
    }
    this.message += "<layout" + s + "/>";
    return this;
  };
  ePOSBuilder.prototype.addRecovery = function () {
    this.message += "<recovery/>";
    return this;
  };
  ePOSBuilder.prototype.addReset = function () {
    this.message += "<reset/>";
    return this;
  };
  ePOSBuilder.prototype.addCommand = function (data) {
    this.message += "<command>" + toHexBinary(data) + "</command>";
    return this;
  };
  ePOSBuilder.prototype.toString = function () {
    var s = "";
    if (this.force) {
      s += getBoolAttr("force", true);
    }
    return (
      '<epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"' +
      s +
      ">" +
      this.message +
      "</epos-print>"
    );
  };
  function toHexBinary(s) {
    var l = s.length,
      r = new Array(l),
      i;
    for (i = 0; i < l; i++) {
      r[i] = ("0" + s.charCodeAt(i).toString(16)).slice(-2);
    }
    return r.join("");
  }
  function toBase64Binary(s) {
    var l = s.length,
      r = new Array(((l + 2) / 3) << 2),
      t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      p = (3 - (l % 3)) % 3,
      j = 0,
      i = 0,
      n;
    s += "\x00\x00";
    while (i < l) {
      n =
        (s.charCodeAt(i++) << 16) |
        (s.charCodeAt(i++) << 8) |
        s.charCodeAt(i++);
      r[j++] = t.charAt((n >> 18) & 63);
      r[j++] = t.charAt((n >> 12) & 63);
      r[j++] = t.charAt((n >> 6) & 63);
      r[j++] = t.charAt(n & 63);
    }
    while (p--) {
      r[--j] = "=";
    }
    return r.join("");
  }
  function toMonoImage(imgdata, s, g) {
    var x = String.fromCharCode,
      m8 = [
        [2, 130, 34, 162, 10, 138, 42, 170],
        [194, 66, 226, 98, 202, 74, 234, 106],
        [50, 178, 18, 146, 58, 186, 26, 154],
        [242, 114, 210, 82, 250, 122, 218, 90],
        [14, 142, 46, 174, 6, 134, 38, 166],
        [206, 78, 238, 110, 198, 70, 230, 102],
        [62, 190, 30, 158, 54, 182, 22, 150],
        [254, 126, 222, 94, 246, 118, 214, 86],
      ],
      d = imgdata.data,
      w = imgdata.width,
      h = imgdata.height,
      r = new Array(((w + 7) >> 3) * h),
      n = 0,
      p = 0,
      q = 0,
      t = 128,
      e = new Array(),
      e1,
      e2,
      b,
      v,
      f,
      i,
      j;
    if (s == 1) {
      i = w;
      while (i--) {
        e.push(0);
      }
    }
    for (j = 0; j < h; j++) {
      e1 = 0;
      e2 = 0;
      i = 0;
      while (i < w) {
        b = i & 7;
        if (s == 0) {
          t = m8[j & 7][b];
        }
        v =
          (Math.pow(
            (((d[p++] * 0.29891 + d[p++] * 0.58661 + d[p++] * 0.11448) * d[p]) /
              255 +
              255 -
              d[p++]) /
              255,
            1 / g
          ) *
            255) |
          0;
        if (s == 1) {
          v += (e[i] + e1) >> 4;
          f = v - (v < t ? 0 : 255);
          if (i > 0) {
            e[i - 1] += f;
          }
          e[i] = f * 7 + e2;
          e1 = f * 5;
          e2 = f * 3;
        }
        if (v < t) {
          n |= 128 >> b;
        }
        i++;
        if (b == 7 || i == w) {
          r[q++] = x(n == 16 ? 32 : n);
          n = 0;
        }
      }
    }
    return r.join("");
  }
  function toGrayImage(imgdata, g) {
    var x = String.fromCharCode,
      m4 = [
        [0, 9, 2, 11],
        [13, 4, 15, 6],
        [3, 12, 1, 10],
        [16, 7, 14, 5],
      ],
      thermal = [
        0, 7, 13, 19, 23, 27, 31, 35, 40, 44, 49, 52, 54, 55, 57, 59, 61, 62,
        64, 66, 67, 69, 70, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
        83, 83, 84, 85, 86, 86, 87, 88, 88, 89, 90, 90, 91, 91, 92, 93, 93, 94,
        94, 95, 96, 96, 97, 98, 98, 99, 99, 100, 101, 101, 102, 102, 103, 103,
        104, 104, 105, 105, 106, 106, 107, 107, 108, 108, 109, 109, 110, 110,
        111, 111, 112, 112, 112, 113, 113, 114, 114, 115, 115, 116, 116, 117,
        117, 118, 118, 119, 119, 120, 120, 120, 121, 121, 122, 122, 123, 123,
        123, 124, 124, 125, 125, 125, 126, 126, 127, 127, 127, 128, 128, 129,
        129, 130, 130, 130, 131, 131, 132, 132, 132, 133, 133, 134, 134, 135,
        135, 135, 136, 136, 137, 137, 137, 138, 138, 139, 139, 139, 140, 140,
        141, 141, 141, 142, 142, 143, 143, 143, 144, 144, 145, 145, 146, 146,
        146, 147, 147, 148, 148, 148, 149, 149, 150, 150, 150, 151, 151, 152,
        152, 152, 153, 153, 154, 154, 155, 155, 155, 156, 156, 157, 157, 158,
        158, 159, 159, 160, 160, 161, 161, 161, 162, 162, 163, 163, 164, 164,
        165, 165, 166, 166, 166, 167, 167, 168, 168, 169, 169, 170, 170, 171,
        171, 172, 173, 173, 174, 175, 175, 176, 177, 178, 178, 179, 180, 180,
        181, 182, 182, 183, 184, 184, 185, 186, 186, 187, 189, 191, 193, 195,
        198, 200, 202, 255,
      ],
      d = imgdata.data,
      w = imgdata.width,
      h = imgdata.height,
      r = new Array(((w + 1) >> 1) * h),
      n = 0,
      p = 0,
      q = 0,
      b,
      v,
      v1,
      i,
      j;
    for (j = 0; j < h; j++) {
      i = 0;
      while (i < w) {
        b = i & 1;
        v =
          thermal[
            (Math.pow(
              (((d[p++] * 0.29891 + d[p++] * 0.58661 + d[p++] * 0.11448) *
                d[p]) /
                255 +
                255 -
                d[p++]) /
                255,
              1 / g
            ) *
              255) |
              0
          ];
        v1 = (v / 17) | 0;
        if (m4[j & 3][i & 3] < v % 17) {
          v1++;
        }
        n |= v1 << ((1 - b) << 2);
        i++;
        if (b == 1 || i == w) {
          r[q++] = x(n);
          n = 0;
        }
      }
    }
    return r.join("");
  }
  function escapeMarkup(s) {
    var markup = /[<>&'"\t\n\r]/g;
    if (markup.test(s)) {
      s = s.replace(markup, function (c) {
        var r = "";
        switch (c) {
          case "<":
            r = "&lt;";
            break;
          case ">":
            r = "&gt;";
            break;
          case "&":
            r = "&amp;";
            break;
          case "'":
            r = "&apos;";
            break;
          case '"':
            r = "&quot;";
            break;
          case "\t":
            r = "&#9;";
            break;
          case "\n":
            r = "&#10;";
            break;
          case "\r":
            r = "&#13;";
            break;
          default:
            break;
        }
        return r;
      });
    }
    return s;
  }
  function escapeControl(s) {
    var control = /[\\\x00-\x1f\x7f-\xff]/g;
    if (control.test(s)) {
      s = s.replace(control, function (c) {
        return c == "\\"
          ? "\\\\"
          : "\\x" + ("0" + c.charCodeAt(0).toString(16)).slice(-2);
      });
    }
    return s;
  }
  var regexFont = /^(font_[a-e]|special_[ab])$/,
    regexAlign = /^(left|center|right)$/,
    regexColor = /^(none|color_[1-4])$/,
    regexFeed = /^(peeling|cutting|current_tof|next_tof)$/,
    regexMode = /^(mono|gray16)$/,
    regexBarcode =
      /^(upc_[ae]|[ej]an13|[ej]an8|code(39|93|128|128_auto)|itf|codabar|gs1_128|gs1_databar_(omnidirectional|truncated|limited|expanded))$/,
    regexHri = /^(none|above|below|both)$/,
    regexSymbol =
      /^(pdf417_(standard|truncated)|qrcode_(model_[12]|micro)|maxicode_mode_[2-6]|gs1_databar_(stacked(_omnidirectional)?|expanded_stacked)|azteccode_(fullrange|compact)|datamatrix_(square|rectangle_(8|12|16)))$/,
    regexLevel = /^(level_[0-8lmqh]|default)$/,
    regexLine = /^(thin|medium|thick)(_double)?$/,
    regexDirection =
      /^(left_to_right|bottom_to_top|right_to_left|top_to_bottom)$/,
    regexCut =
      /^(no_feed|feed|reserve|no_feed_fullcut|feed_fullcut|reserve_fullcut)$/,
    regexDrawer = /^drawer_[12]$/,
    regexPulse = /^pulse_[1-5]00$/,
    regexPattern = /^(none|pattern_(10|[0-9a-e])|error|paper_end)$/,
    regexLayout = /^(receipt|label)(_bm)?$/;
  function getEnumAttr(name, value, regex) {
    if (!regex.test(value)) {
      throw new Error('Parameter "' + name + '" is invalid');
    }
    return " " + name + '="' + value + '"';
  }
  function getBoolAttr(name, value) {
    return " " + name + '="' + !!value + '"';
  }
  function getIntAttr(name, value, min, max) {
    if (isNaN(value) || value < min || value > max) {
      throw new Error('Parameter "' + name + '" is invalid');
    }
    return " " + name + '="' + value + '"';
  }
  function getUByteAttr(name, value) {
    return getIntAttr(name, value, 0, 255);
  }
  function getUShortAttr(name, value) {
    return getIntAttr(name, value, 0, 65535);
  }
  function getShortAttr(name, value) {
    return getIntAttr(name, value, -32768, 32767);
  }
  function getEnumIntAttr(name, value, regex, min, max) {
    if (!regex.test(value)) {
      if (isNaN(value) || value < min || value > max) {
        throw new Error('Parameter "' + name + '" is invalid');
      }
    }
    return " " + name + '="' + value + '"';
  }
  function ePOSPrint(address) {
    this.address = address;
    this.enabled = false;
    this.interval = 3000;
    this.timeout = 300000;
    this.status = 0;
    this.battery = 0;
    this.drawerOpenLevel = 0;
    this.onreceive = null;
    this.onerror = null;
    this.onstatuschange = null;
    this.ononline = null;
    this.onoffline = null;
    this.onpoweroff = null;
    this.oncoverok = null;
    this.oncoveropen = null;
    this.onpaperok = null;
    this.onpaperend = null;
    this.onpapernearend = null;
    this.ondrawerclosed = null;
    this.ondraweropen = null;
    this.onbatterylow = null;
    this.onbatteryok = null;
    this.onbatterystatuschange = null;
    this.ASB_NO_RESPONSE = 1;
    this.ASB_PRINT_SUCCESS = 2;
    this.ASB_DRAWER_KICK = 4;
    this.ASB_BATTERY_OFFLINE = 4;
    this.ASB_OFF_LINE = 8;
    this.ASB_COVER_OPEN = 32;
    this.ASB_PAPER_FEED = 64;
    this.ASB_WAIT_ON_LINE = 256;
    this.ASB_PANEL_SWITCH = 512;
    this.ASB_MECHANICAL_ERR = 1024;
    this.ASB_AUTOCUTTER_ERR = 2048;
    this.ASB_UNRECOVER_ERR = 8192;
    this.ASB_AUTORECOVER_ERR = 16384;
    this.ASB_RECEIPT_NEAR_END = 131072;
    this.ASB_RECEIPT_END = 524288;
    this.ASB_BUZZER = 16777216;
    this.ASB_WAIT_REMOVE_LABEL = 16777216;
    this.ASB_NO_LABEL = 67108864;
    this.ASB_SPOOLER_IS_STOPPED = 2147483648;
    this.DRAWER_OPEN_LEVEL_LOW = 0;
    this.DRAWER_OPEN_LEVEL_HIGH = 1;
  }
  ePOSPrint.prototype = new ePOSBuilder();
  ePOSPrint.prototype.constructor = ePOSPrint;
  ePOSPrint.prototype.open = function () {
    if (!this.enabled) {
      this.enabled = true;
      this.status = 0;
      this.battery = 0;
      this.send();
    }
  };
  ePOSPrint.prototype.close = function () {
    this.enabled = false;
    if (this.intervalid) {
      clearTimeout(this.intervalid);
      delete this.intervalid;
    }
    if (this.intervalxhr) {
      this.intervalxhr.abort();
      delete this.intervalxhr;
    }
  };
  ePOSPrint.prototype.getPrintJobStatus = function (printjobid) {
    this.send(printjobid);
  };
  ePOSPrint.prototype.send = function (request, printjobid) {
    var args = arguments.length,
      epos = this,
      address = epos.address,
      soap,
      xhr,
      tid,
      res,
      success,
      code,
      status,
      battery;
    if (!/^<epos/.test(request)) {
      if (args < 2) {
        printjobid = request;
        request = new ePOSBuilder().toString();
      } else {
        address = request;
        request = printjobid;
        printjobid = arguments[2];
      }
    }
    soap =
      '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">';
    if (printjobid) {
      soap +=
        '<s:Header><parameter xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"><printjobid>' +
        printjobid +
        "</printjobid></parameter></s:Header>";
    }
    soap += "<s:Body>" + request + "</s:Body></s:Envelope>";
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
      if (!("withCredentials" in xhr) && window.XDomainRequest) {
        xhr = new XDomainRequest();
        xhr.open("POST", address, true);
        xhr.onload = function () {
          res = xhr.responseText;
          if (/response/.test(res)) {
            success = /success\s*=\s*"\s*(1|true)\s*"/.test(res);
            code = res.match(/code\s*=\s*"\s*(\S*)\s*"/) ? RegExp.$1 : "";
            status = res.match(/status\s*=\s*"\s*(\d+)\s*"/)
              ? parseInt(RegExp.$1)
              : 0;
            battery = res.match(/battery\s*=\s*"\s*(\d+)\s*"/)
              ? parseInt(RegExp.$1)
              : 0;
            printjobid = res.match(/<printjobid>\s*(\S*)\s*<\/printjobid>/)
              ? RegExp.$1
              : "";
            if (args > 0) {
              fireReceiveEvent(
                epos,
                success,
                code,
                status,
                battery,
                printjobid
              );
            } else {
              fireStatusEvent(epos, status, battery);
            }
          } else {
            if (args > 0) {
              fireErrorEvent(epos, 0, xhr.responseText);
            } else {
              fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0);
            }
          }
          if (args < 1) {
            updateStatus(epos);
          }
        };
        xhr.onerror = function () {
          if (args > 0) {
            fireErrorEvent(epos, 0, xhr.responseText);
          } else {
            fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0);
            updateStatus(epos);
          }
        };
        xhr.onprogress = function () {};
        xhr.ontimeout = xhr.onerror;
        xhr.timeout = epos.timeout;
        xhr.send(soap);
      } else {
        xhr.open("POST", address, true);
        xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
        xhr.setRequestHeader(
          "If-Modified-Since",
          "Thu, 01 Jan 1970 00:00:00 GMT"
        );
        xhr.setRequestHeader("SOAPAction", '""');
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            clearTimeout(tid);
            if (xhr.status == 200 && xhr.responseXML) {
              res = xhr.responseXML.getElementsByTagName("response");
              if (res.length > 0) {
                success = /^(1|true)$/.test(res[0].getAttribute("success"));
                code = res[0].hasAttribute("code")
                  ? res[0].getAttribute("code")
                  : "";
                status = res[0].hasAttribute("status")
                  ? parseInt(res[0].getAttribute("status"))
                  : 0;
                battery = res[0].hasAttribute("battery")
                  ? parseInt(res[0].getAttribute("battery"))
                  : 0;
                res = xhr.responseXML.getElementsByTagName("printjobid");
                printjobid = res.length > 0 ? res[0].textContent : "";
                if (args > 0) {
                  fireReceiveEvent(
                    epos,
                    success,
                    code,
                    status,
                    battery,
                    printjobid
                  );
                } else {
                  fireStatusEvent(epos, status, battery);
                }
              } else {
                if (args > 0) {
                  fireErrorEvent(epos, xhr.status, xhr.responseText);
                } else {
                  fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0);
                }
              }
            } else {
              if (args > 0) {
                fireErrorEvent(epos, xhr.status, xhr.responseText);
              } else {
                fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0);
              }
            }
            if (args < 1) {
              updateStatus(epos);
            }
          }
        };
        tid = setTimeout(function () {
          xhr.abort();
        }, epos.timeout);
        xhr.send(soap);
      }
      if (args < 1) {
        epos.intervalxhr = xhr;
      }
    } else {
      throw new Error("XMLHttpRequest is not supported");
    }
  };
  function fireReceiveEvent(epos, success, code, status, battery, printjobid) {
    if (code == "EX_ENPC_TIMEOUT") {
      code = "ERROR_DEVICE_BUSY";
    }
    if (epos.onreceive) {
      epos.onreceive({
        success: success,
        code: code,
        status: status,
        battery: battery,
        printjobid: printjobid,
      });
    }
  }
  function fireStatusEvent(epos, status, battery) {
    var diff, difb;
    if (status == 0 || status == epos.ASB_NO_RESPONSE) {
      status = epos.status | epos.ASB_NO_RESPONSE;
    }
    diff = epos.status == 0 ? ~0 : epos.status ^ status;
    difb = epos.status == 0 ? ~0 : epos.battery ^ battery;
    epos.status = status;
    epos.battery = battery;
    if (diff && epos.onstatuschange) {
      epos.onstatuschange(status);
    }
    if (difb && epos.onbatterystatuschange) {
      epos.onbatterystatuschange(battery);
    }
    if (diff & (epos.ASB_NO_RESPONSE | epos.ASB_OFF_LINE)) {
      if (status & epos.ASB_NO_RESPONSE) {
        if (epos.onpoweroff) {
          epos.onpoweroff();
        }
      } else {
        if (status & epos.ASB_OFF_LINE) {
          if (epos.onoffline) {
            epos.onoffline();
          }
        } else {
          if (epos.ononline) {
            epos.ononline();
          }
        }
      }
    }
    if (diff & epos.ASB_COVER_OPEN) {
      if (status & epos.ASB_NO_RESPONSE) {
      } else {
        if (status & epos.ASB_COVER_OPEN) {
          if (epos.oncoveropen) {
            epos.oncoveropen();
          }
        } else {
          if (epos.oncoverok) {
            epos.oncoverok();
          }
        }
      }
    }
    if (diff & (epos.ASB_RECEIPT_END | epos.ASB_RECEIPT_NEAR_END)) {
      if (status & epos.ASB_NO_RESPONSE) {
      } else {
        if (status & epos.ASB_RECEIPT_END) {
          if (epos.onpaperend) {
            epos.onpaperend();
          }
        } else {
          if (status & epos.ASB_RECEIPT_NEAR_END) {
            if (epos.onpapernearend) {
              epos.onpapernearend();
            }
          } else {
            if (epos.onpaperok) {
              epos.onpaperok();
            }
          }
        }
      }
    }
    if (diff & epos.ASB_DRAWER_KICK) {
      if (status & epos.ASB_NO_RESPONSE) {
      } else {
        if (status & epos.ASB_DRAWER_KICK) {
          if (epos.drawerOpenLevel == epos.DRAWER_OPEN_LEVEL_HIGH) {
            if (epos.ondraweropen) {
              epos.ondraweropen();
            }
          } else {
            if (epos.ondrawerclosed) {
              epos.ondrawerclosed();
            }
          }
          if (epos.onbatterylow) {
            epos.onbatterylow();
          }
        } else {
          if (epos.drawerOpenLevel == epos.DRAWER_OPEN_LEVEL_HIGH) {
            if (epos.ondrawerclosed) {
              epos.ondrawerclosed();
            }
          } else {
            if (epos.ondraweropen) {
              epos.ondraweropen();
            }
          }
          if (epos.onbatteryok) {
            epos.onbatteryok();
          }
        }
      }
    }
  }
  function fireErrorEvent(epos, status, responseText) {
    if (epos.onerror) {
      epos.onerror({ status: status, responseText: responseText });
    }
  }
  function updateStatus(epos) {
    var delay = epos.interval;
    if (epos.enabled) {
      if (isNaN(delay) || delay < 1000) {
        delay = 3000;
      }
      epos.intervalid = setTimeout(function () {
        delete epos.intervalid;
        if (epos.enabled) {
          epos.send();
        }
      }, delay);
    }
    delete epos.intervalxhr;
  }
  function CanvasPrint(address) {
    this.address = address;
    this.mode = "mono";
    this.halftone = 0;
    this.brightness = 1;
    this.align = "left";
    this.color = "color_1";
    this.paper = "receipt";
    this.feed = "current_tof";
    this.cut = false;
    this.layout = null;
    this.ALIGN_LEFT = "left";
    this.ALIGN_CENTER = "center";
    this.ALIGN_RIGHT = "right";
    this.COLOR_NONE = "none";
    this.COLOR_1 = "color_1";
    this.COLOR_2 = "color_2";
    this.COLOR_3 = "color_3";
    this.COLOR_4 = "color_4";
    this.FEED_PEELING = "peeling";
    this.FEED_CUTTING = "cutting";
    this.FEED_CURRENT_TOF = "current_tof";
    this.FEED_NEXT_TOF = "next_tof";
    this.HALFTONE_DITHER = 0;
    this.HALFTONE_ERROR_DIFFUSION = 1;
    this.HALFTONE_THRESHOLD = 2;
    this.MODE_MONO = "mono";
    this.MODE_GRAY16 = "gray16";
    this.PAPER_RECEIPT = "receipt";
    this.PAPER_RECEIPT_BM = "receipt_bm";
    this.PAPER_LABEL = "label";
    this.PAPER_LABEL_BM = "label_bm";
    this.connectionObj = null;
  }
  CanvasPrint.prototype = new ePOSPrint();
  CanvasPrint.prototype.constructor = CanvasPrint;
  CanvasPrint.prototype.setConnectionObject = function (connectionObj) {
    this.connectionObj = connectionObj;
  };
  CanvasPrint.prototype.print = function () {
    var args = arguments.length;
    var address = this.address,
      layout = this.layout,
      paper = this.paper;
    var canvas = arguments[0],
      cut = this.cut,
      mode = this.mode,
      printjobid = undefined;
    switch (args) {
      case 2:
        printjobid = arguments[1];
        break;
      case 4:
        printjobid = arguments[3];
      case 3:
        cut = arguments[1];
        mode = arguments[2];
        break;
    }
    if (typeof canvas == "undefined" || canvas == null) {
      throw new Error("Canvas is not supported");
    }
    if (!canvas.getContext) {
      throw new Error("Canvas is not supported");
    }
    if (layout) {
      this.addLayout(
        paper,
        layout.width,
        layout.height,
        layout.margin_top,
        layout.margin_bottom,
        layout.offset_cut,
        layout.offset_label
      );
    }
    if (paper != this.PAPER_RECEIPT) {
      this.addFeedPosition(this.FEED_CURRENT_TOF);
      if (layout) {
        this.addFeedPosition(this.FEED_NEXT_TOF);
      }
    }
    this.addTextAlign(this.align);
    this.addImage(
      canvas.getContext("2d"),
      0,
      0,
      canvas.width,
      canvas.height,
      this.color,
      mode
    );
    if (paper != this.PAPER_RECEIPT) {
      this.addFeedPosition(this.feed);
      if (cut) {
        this.addCut(this.CUT_NO_FEED);
      }
    } else {
      if (cut) {
        this.addCut(this.CUT_FEED);
      }
    }
    this.send(printjobid);
  };
  CanvasPrint.prototype.recover = function () {
    this.force = true;
    this.addRecovery();
    this.send();
  };
  CanvasPrint.prototype.reset = function () {
    this.addReset();
    this.send();
  };
  if (!window.epson) {
    window.epson = {};
  }
  window.epson.ePOSBuilder = ePOSBuilder;
  window.epson.ePOSPrint = ePOSPrint;
  window.epson.CanvasPrint = CanvasPrint;
  function POSKeyboard(deviceID, isCrypto) {
    this.deviceID = deviceID;
    this.isCrypto = isCrypto;
    this.connectionObj = null;
  }
  POSKeyboard.prototype = {
    setConnectionObject: function (connectionObj) {
      this.connectionObj = connectionObj;
    },
    client_onkeypress: function (data) {
      try {
        if (this.onkeypress == null) {
          return;
        }
        this.onkeypress(data);
      } catch (e) {}
      return;
    },
    callEvent: function (eventName, data) {
      var eventReq = data;
      eventReq.type = eventName;
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        eventReq,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {}
      return sequence;
    },
  };
  function Printer(deviceID, isCrypto, ePOSDeviceContext) {
    this.deviceID = deviceID;
    this.isCrypto = isCrypto;
    this.ePosDev = ePOSDeviceContext;
    this.timeout = 10000;
  }
  Printer.prototype = new CanvasPrint();
  Printer.prototype.finalize = function () {
    this.stopMonitor();
  };
  Printer.prototype.toString = function () {
    var str = ePOSBuilder.prototype.toString.apply(this);
    return str;
  };
  Printer.prototype.addFeedUnit = function (unit) {
    try {
      ePOSBuilder.prototype.addFeedUnit.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addFeedLine = function (line) {
    try {
      ePOSBuilder.prototype.addFeedLine.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addFeed = function (unit) {
    try {
      ePOSBuilder.prototype.addFeed.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addFeedPosition = function (line) {
    try {
      ePOSBuilder.prototype.addFeedPosition.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addText = function (text) {
    try {
      ePOSBuilder.prototype.addText.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addTextLang = function (lang) {
    try {
      ePOSBuilder.prototype.addTextLang.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addTextAlign = function (align) {
    try {
      ePOSBuilder.prototype.addTextAlign.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addTextRotate = function (rotate) {
    try {
      ePOSBuilder.prototype.addTextRotate.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addTextLineSpace = function (linespc) {
    try {
      ePOSBuilder.prototype.addTextLineSpace.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addTextFont = function (font) {
    try {
      ePOSBuilder.prototype.addTextFont.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addTextSmooth = function (smooth) {
    try {
      ePOSBuilder.prototype.addTextSmooth.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addTextDouble = function (dw, dh) {
    try {
      ePOSBuilder.prototype.addTextDouble.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addTextSize = function (width, height) {
    try {
      ePOSBuilder.prototype.addTextSize.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addTextStyle = function (reverse, ul, em, color) {
    try {
      ePOSBuilder.prototype.addTextStyle.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addTextPosition = function (x) {
    try {
      ePOSBuilder.prototype.addTextPosition.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addTextVPosition = function (y) {
    try {
      ePOSBuilder.prototype.addTextVPosition.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addImage = function (
    context,
    x,
    y,
    width,
    height,
    color,
    mode
  ) {
    try {
      ePOSBuilder.prototype.addImage.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addLogo = function (key1, key2) {
    try {
      ePOSBuilder.prototype.addLogo.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addBarcode = function (
    barCodeData,
    type,
    hri,
    font,
    width,
    height
  ) {
    try {
      ePOSBuilder.prototype.addBarcode.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addSymbol = function (
    symbolData,
    type,
    level,
    width,
    height,
    size
  ) {
    try {
      ePOSBuilder.prototype.addSymbol.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addCommand = function (data) {
    try {
      ePOSBuilder.prototype.addCommand.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addHLine = function (x1, x2, style) {
    try {
      ePOSBuilder.prototype.addHLine.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addVLineBegin = function (x, style) {
    try {
      ePOSBuilder.prototype.addVLineBegin.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addVLineEnd = function (x, style) {
    try {
      ePOSBuilder.prototype.addVLineEnd.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addPageBegin = function () {
    try {
      ePOSBuilder.prototype.addPageBegin.apply(this);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addPageEnd = function () {
    try {
      ePOSBuilder.prototype.addPageEnd.apply(this);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addPageArea = function (x, y, width, height) {
    try {
      ePOSBuilder.prototype.addPageArea.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addPageDirection = function (dir) {
    try {
      ePOSBuilder.prototype.addPageDirection.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addPagePosition = function (x, y) {
    try {
      ePOSBuilder.prototype.addPagePosition.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addPageLine = function (x1, y1, x2, y2, style) {
    try {
      ePOSBuilder.prototype.addPageLine.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addPageRectangle = function (x1, y1, x2, y2, style) {
    try {
      ePOSBuilder.prototype.addPageRectangle.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addRotateBegin = function () {
    try {
      ePOSBuilder.prototype.addRotateBegin.apply(this);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addRotateEnd = function () {
    try {
      ePOSBuilder.prototype.addRotateEnd.apply(this);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addCut = function (type) {
    try {
      ePOSBuilder.prototype.addCut.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addPulse = function (drawer, time) {
    try {
      ePOSBuilder.prototype.addPulse.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addSound = function (pattern, repeat, cycle) {
    try {
      ePOSBuilder.prototype.addSound.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.addLayout = function (
    type,
    width,
    height,
    margin_top,
    margin_bottom,
    offset_cut,
    offset_label
  ) {
    try {
      ePOSBuilder.prototype.addLayout.apply(this, arguments);
    } catch (e) {
      throw e;
    }
    return this;
  };
  Printer.prototype.setXmlString = function (xml) {
    this.message = xml;
  };
  Printer.prototype.getXmlString = function () {
    return this.message;
  };
  Printer.prototype.getPrintJobStatus = function (printjobid) {
    this.setXmlString("");
    this.send(printjobid);
  };
  Printer.prototype.send = function (printjobid) {
    var sq = -1;
    if (!this.ePosDev.eposprint && this.connectionObj.isUsableDeviceIF()) {
      try {
        var data = {
          type: "print",
          timeout: this.timeout,
          printdata: this.toString(),
        };
        switch (arguments.length) {
          case 0:
            data.printdata = this.toString();
            break;
          case 1:
            data.printdata = this.toString();
            data.printjobid = printjobid;
            break;
          case 2:
          case 3:
            data.printdata = arguments[1];
            data.printjobid = arguments[2];
        }
        var eposmsg = MessageFactory.getDeviceDataMessage(
          this.deviceID,
          data,
          this.isCrypto
        );
        var sequence = -1;
        try {
          this.connectionObj.emit(eposmsg);
          sequence = eposmsg.sequence;
        } catch (e) {}
        this.force = false;
        this.setXmlString("");
      } catch (e) {
        sq = -1;
      }
    } else {
      var self = this,
        address =
          this.connectionObj.getAddressWithProtocol() +
          "/cgi-bin/epos/service.cgi?devid=" +
          this.deviceID +
          "&timeout=" +
          this.timeout,
        soap,
        xhr,
        tid,
        res,
        success,
        code,
        status,
        battery;
      soap =
        '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">';
      if (printjobid) {
        soap +=
          '<s:Header><parameter xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"><printjobid>' +
          printjobid +
          "</printjobid></parameter></s:Header>";
      }
      soap += "<s:Body>" + this.toString() + "</s:Body></s:Envelope>";
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        if (!("withCredentials" in xhr) && window.XDomainRequest) {
          xhr = new XDomainRequest();
          xhr.open("POST", address, true);
          xhr.onload = function () {
            res = xhr.responseText;
            if (/response/.test(res)) {
              success = /success\s*=\s*"\s*(1|true)\s*"/.test(res);
              code = res.match(/code\s*=\s*"\s*(\S*)\s*"/) ? RegExp.$1 : "";
              status = res.match(/status\s*=\s*"\s*(\d+)\s*"/)
                ? parseInt(RegExp.$1)
                : 0;
              battery = res.match(/battery\s*=\s*"\s*(\d+)\s*"/)
                ? parseInt(RegExp.$1)
                : 0;
              printjobid = res.match(/<printjobid>\s*(\S*)\s*<\/printjobid>/)
                ? RegExp.$1
                : "";
              self.fireReceiveEvent(
                success,
                code,
                status,
                battery,
                printjobid,
                0
              );
            } else {
              self.fireErrorEvent(0, xhr.responseText, 0);
            }
          };
          xhr.onerror = function () {
            self.fireErrorEvent(0, xhr.responseText, 0);
          };
          xhr.onprogress = function () {};
          xhr.ontimeout = xhr.onerror;
          xhr.timeout = self.timeout;
          xhr.send(soap);
        } else {
          xhr.open("POST", address, true);
          xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
          xhr.setRequestHeader(
            "If-Modified-Since",
            "Thu, 01 Jan 1970 00:00:00 GMT"
          );
          xhr.setRequestHeader("SOAPAction", '""');
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              clearTimeout(tid);
              if (xhr.status == 200 && xhr.responseXML) {
                res = xhr.responseXML.getElementsByTagName("response");
                if (res.length > 0) {
                  success = /^(1|true)$/.test(res[0].getAttribute("success"));
                  code = res[0].hasAttribute("code")
                    ? res[0].getAttribute("code")
                    : "";
                  status = res[0].hasAttribute("status")
                    ? parseInt(res[0].getAttribute("status"))
                    : 0;
                  battery = res[0].hasAttribute("battery")
                    ? parseInt(res[0].getAttribute("battery"))
                    : 0;
                  res = xhr.responseXML.getElementsByTagName("printjobid");
                  printjobid = res.length > 0 ? res[0].textContent : "";
                  self.fireReceiveEvent(
                    success,
                    code,
                    status,
                    battery,
                    printjobid,
                    0
                  );
                } else {
                  self.fireErrorEvent(xhr.status, xhr.responseText, 0);
                }
              } else {
                self.fireErrorEvent(xhr.status, xhr.responseText, 0);
              }
            }
          };
          tid = setTimeout(function () {
            xhr.abort();
          }, this.timeout);
          xhr.send(soap);
        }
        this.setXmlString("");
      } else {
        throw new Error("XMLHttpRequest is not supported");
      }
      sq = 0;
    }
    return sq;
  };
  Printer.prototype.client_onxmlresult = function (res, sq) {
    if (res) {
      var xml = res.resultdata;
      var success = /success\s*=\s*"\s*(1|true)\s*"/.test(xml);
      xml.match(/code\s*=\s*"\s*(\S*)\s*"/);
      var code = RegExp.$1;
      xml.match(/status\s*=\s*"\s*(\d+)\s*"/);
      var status = parseInt(RegExp.$1);
      xml.match(/battery\s*=\s*"\s*(\d+)\s*"/);
      var battery = parseInt(RegExp.$1);
      this.fireReceiveEvent(success, code, status, battery, res.printjobid, sq);
    } else {
      this.fireErrorEvent(0, this.ASB_NO_RESPONSE, sq);
    }
  };
  Printer.prototype.startMonitor = function () {
    var result = false;
    var address =
      this.connectionObj.getAddressWithProtocol() +
      "/cgi-bin/epos/service.cgi?devid=" +
      this.deviceID +
      "&timeout=10000";
    try {
      if (!this.enabled) {
        this.address = address;
        this.enabled = true;
        this.status = this.ASB_DRAWER_KICK;
        this.sendStartMonitorCommand();
      }
      result = true;
    } catch (e) {
      throw e;
    }
    return result;
  };
  Printer.prototype.sendStartMonitorCommand = function () {
    var self = this;
    var address = this.address;
    var request = new ePOSBuilder().toString();
    var soap =
      '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body>' +
      request +
      "</s:Body></s:Envelope>";
    var epos = this;
    if (window.XDomainRequest) {
      var xdr = new XDomainRequest();
      xdr.open("POST", address, true);
      xdr.onload = function () {
        var res = xdr.responseText;
        if (/response/.test(res)) {
          var success = /success\s*=\s*"\s*(1|true)\s*"/.test(res);
          res.match(/code\s*=\s*"\s*(\S*)\s*"/);
          var code = RegExp.$1;
          res.match(/status\s*=\s*"\s*(\d+)\s*"/);
          var status = parseInt(RegExp.$1);
          res.match(/battery\s*=\s*"\s*(\d+)\s*"/);
          var battery = parseInt(RegExp.$1);
          self.fireStatusEvent(epos, status, battery);
        } else {
          self.fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0);
        }
        self.updateStatus(epos);
      };
      xdr.onerror = function () {
        self.fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0);
        self.updateStatus(epos);
      };
      xdr.onprogress = function () {};
      xdr.ontimeout = xdr.onerror;
      xdr.send(soap);
    } else {
      if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", address, true);
        xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
        xhr.setRequestHeader(
          "If-Modified-Since",
          "Thu, 01 Jan 1970 00:00:00 GMT"
        );
        xhr.setRequestHeader("SOAPAction", '""');
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (xhr.status == 200 && xhr.responseXML) {
              var res = xhr.responseXML.getElementsByTagName("response");
              if (res.length > 0) {
                var success = /^(1|true)$/.test(res[0].getAttribute("success"));
                var code = res[0].getAttribute("code");
                var status = parseInt(res[0].getAttribute("status"));
                var battery = res[0].hasAttribute("battery")
                  ? parseInt(res[0].getAttribute("battery"))
                  : 0;
                self.fireStatusEvent(epos, status, battery);
              } else {
                self.fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0);
              }
            } else {
              self.fireStatusEvent(epos, epos.ASB_NO_RESPONSE, 0);
            }
            self.updateStatus(epos);
          }
        };
        xhr.send(soap);
      } else {
        throw new Error("XMLHttpRequest is not supported");
      }
    }
  };
  Printer.prototype.stopMonitor = function () {
    var result = false;
    try {
      this.enabled = false;
      if (this.timeoutid) {
        clearTimeout(this.timeoutid);
        delete this.timeoutid;
      }
      result = true;
    } catch (e) {
      throw e;
    }
    return result;
  };
  Printer.prototype.fireReceiveEvent = function (
    success,
    code,
    status,
    battery,
    printjobid,
    sq
  ) {
    delete this.isPrint;
    if (code == "EX_ENPC_TIMEOUT") {
      code = "ERROR_DEVICE_BUSY";
    }
    if (this.onreceive) {
      this.onreceive(
        {
          success: success,
          code: code,
          status: status,
          battery: battery,
          printjobid: printjobid,
        },
        sq
      );
    }
  };
  Printer.prototype.fireErrorEvent = function (status, responseText, sq) {
    if (this.onerror) {
      this.onerror({ status: status, responseText: responseText }, sq);
    }
    this.ePosDev.cleanup();
  };
  Printer.prototype.fireStatusEvent = function (epos, status, battery) {
    if (status == 0 || status == this.ASB_NO_RESPONSE) {
      status = this.status | this.ASB_NO_RESPONSE;
    }
    var diff = this.status == this.ASB_DRAWER_KICK ? ~0 : this.status ^ status;
    var difb = this.status == 0 ? ~0 : this.battery ^ battery;
    this.status = status;
    this.battery = battery;
    if (diff && this.onstatuschange) {
      this.onstatuschange(status);
    }
    if (difb && this.onbatterystatuschange) {
      this.onbatterystatuschange(battery);
    }
    if (diff & (this.ASB_NO_RESPONSE | this.ASB_OFF_LINE)) {
      if (status & this.ASB_NO_RESPONSE) {
        if (this.onpoweroff) {
          this.onpoweroff();
        }
      } else {
        if (status & this.ASB_OFF_LINE) {
          if (this.onoffline) {
            this.onoffline();
          }
        } else {
          if (this.ononline) {
            this.ononline();
          }
        }
      }
    }
    if (diff & this.ASB_COVER_OPEN) {
      if (status & this.ASB_NO_RESPONSE) {
      } else {
        if (status & this.ASB_COVER_OPEN) {
          if (this.oncoveropen) {
            this.oncoveropen();
          }
        } else {
          if (this.oncoverok) {
            this.oncoverok();
          }
        }
      }
    }
    if (diff & (this.ASB_RECEIPT_END | this.ASB_RECEIPT_NEAR_END)) {
      if (status & this.ASB_NO_RESPONSE) {
      } else {
        if (status & this.ASB_RECEIPT_END) {
          if (this.onpaperend) {
            this.onpaperend();
          }
        } else {
          if (status & this.ASB_RECEIPT_NEAR_END) {
            if (this.onpapernearend) {
              this.onpapernearend();
            }
          } else {
            if (this.onpaperok) {
              this.onpaperok();
            }
          }
        }
      }
    }
    if (diff & this.ASB_DRAWER_KICK) {
      if (status & this.ASB_NO_RESPONSE) {
      } else {
        if (status & this.ASB_DRAWER_KICK) {
          if (this.drawerOpenLevel == this.DRAWER_OPEN_LEVEL_HIGH) {
            if (this.ondraweropen) {
              this.ondraweropen();
            }
          } else {
            if (this.ondrawerclosed) {
              this.ondrawerclosed();
            }
          }
          if (this.onbatterylow) {
            this.onbatterylow();
          }
        } else {
          if (this.drawerOpenLevel == this.DRAWER_OPEN_LEVEL_HIGH) {
            if (this.ondrawerclosed) {
              this.ondrawerclosed();
            }
          } else {
            if (this.ondraweropen) {
              this.ondraweropen();
            }
          }
          if (this.onbatteryok) {
            this.onbatteryok();
          }
        }
      }
    }
  };
  Printer.prototype.updateStatus = function () {
    var self = this;
    if (this.enabled) {
      var delay = this.interval;
      if (isNaN(delay) || delay < 1000) {
        delay = 3000;
      }
      this.timeoutid = setTimeout(function () {
        delete self.timeoutid;
        if (self.enabled) {
          self.sendStartMonitorCommand();
        }
      }, delay);
    }
  };
  Printer.prototype.print = function (canvas, cut, mode, printjobid) {
    try {
      CanvasPrint.prototype.print.apply(this, arguments);
    } catch (e) {
      throw e;
    }
  };
  Printer.prototype.reset = function () {
    try {
      CanvasPrint.prototype.reset.apply(this, arguments);
    } catch (e) {
      throw e;
    }
  };
  Printer.prototype.recover = function () {
    try {
      CanvasPrint.prototype.recover.apply(this, arguments);
    } catch (e) {
      throw e;
    }
  };
  function HybridPrinter(deviceID, isCrypto, ePOSDeviceContext) {
    this.deviceID = deviceID;
    this.isCrypto = isCrypto;
    this.ePosDev = ePOSDeviceContext;
    this.connectionObj = null;
    this.ReceiptPrinter;
    this.SlipPrinter;
    this.EndorsePrinter;
    this.MICRReader;
    this.force = false;
    this.onstatuschange;
    this.ononline;
    this.onoffline;
    this.onpoweroff;
    this.oncoveropen;
    this.onpaperok;
    this.onpapernearend;
    this.onpaperend;
    this.ondrawerclosed;
    this.ondraweropen;
    this.ASB_NO_RESPONSE = 1;
    this.ASB_PRINT_SUCCESS = 2;
    this.ASB_DRAWER_KICK = 4;
    this.ASB_OFF_LINE = 8;
    this.ASB_COVER_OPEN = 32;
    this.ASB_PAPER_FEED = 64;
    this.ASB_WAIT_ON_LINE = 256;
    this.ASB_PANEL_SWITCH = 512;
    this.ASB_MECHANICAL_ERR = 1024;
    this.ASB_AUTOCUTTER_ERR = 2048;
    this.ASB_UNRECOVER_ERR = 8192;
    this.ASB_AUTORECOVER_ERR = 16384;
    this.ASB_RECEIPT_NEAR_END = 131072;
    this.ASB_RECEIPT_END = 524288;
    this.ASB_TOF_NOPAPER = 2097152;
    this.ASB_BOF_NOPAPER = 4194304;
    this.ASB_SLIP_NO_SELECT = 16777216;
    this.ASB_SLIP_IMPOSSIBLE_PRINT = 33554432;
    this.ASB_SPOOLER_IS_STOPPED = 2147483648;
    this.SUCCESS = "SUCCESS";
    this.CANCEL = "CANCEL";
    this.ERROR_PARAMMETER = "ERROR_PARAMMETER";
    this.ERROR_COMMAND = "ERROR_COMMAND";
    this.ERROR_DEVICE_NOT_FOUND = "ERROR_DEVICE_NOT_FOUND";
    this.ERROR_DEVICE_BUSY = "ERROR_DEVICE_BUSY";
    this.ERROR_NOT_SUPPORTED = "ERROR_NOT_SUPPORTED";
    this.ERROR_COVER_OPEN = "ERROR_COVER_OPEN";
    this.ERROR_TIMEOUT = "ERROR_TIMEOUT";
    this.ERROR_AUTOMATICAL = "ERROR_AUTOMATICAL";
    this.ERROR_UNRECOVERABLE = "ERROR_UNRECOVERABLE";
    this.ERROR_BADPORT = "ERROR_BADPORT";
    this.SYSTEM_ERROR = "SYSTEM_ERROR";
    this.init(deviceID);
  }
  HybridPrinter.prototype = {
    init: function (deviceID) {
      var obj = this;
      obj.deviceID = deviceID;
      obj.ReceiptPrinter = new ReceiptPrinter(this);
      obj.SlipPrinter = new SlipPrinter(this);
      obj.EndorsePrinter = new EndorsePrinter(this);
      obj.MICRReader = new MICRReader(this);
      obj.ReceiptPrinter.onstatuschange = function (status) {
        if (obj.onstatuschange != null) {
          obj.onstatuschange(status);
        }
      };
      obj.ReceiptPrinter.ononline = function () {
        if (obj.ononline != null) {
          obj.ononline();
        }
      };
      obj.ReceiptPrinter.onoffline = function () {
        if (obj.onoffline != null) {
          obj.onoffline();
        }
      };
      obj.ReceiptPrinter.onpoweroff = function () {
        if (obj.onpoweroff != null) {
          obj.onpoweroff();
        }
      };
      obj.ReceiptPrinter.oncoveropen = function () {
        if (obj.oncoveropen != null) {
          obj.oncoveropen();
        }
      };
      obj.ReceiptPrinter.onpaperok = function () {
        if (obj.onpaperok != null) {
          obj.onpaperok();
        }
      };
      obj.ReceiptPrinter.onpapernearend = function () {
        if (obj.onpapernearend != null) {
          obj.onpapernearend();
        }
      };
      obj.ReceiptPrinter.onpaperend = function () {
        if (obj.onpaperend != null) {
          obj.onpaperend();
        }
      };
      obj.ReceiptPrinter.ondrawerclosed = function () {
        if (obj.ondrawerclosed != null) {
          obj.ondrawerclosed();
        }
      };
      obj.ReceiptPrinter.ondraweropen = function () {
        if (obj.ondraweropen != null) {
          obj.ondraweropen();
        }
      };
    },
    setConnectionObject: function (connectionObj) {
      this.connectionObj = connectionObj;
      this.ReceiptPrinter.setConnectionObject(this.connectionObj);
    },
    lock: function () {
      var data = { type: "lock" };
      return this.send(data);
    },
    unlock: function () {
      var data = { type: "unlock" };
      return this.send(data);
    },
    eject: function () {
      var data = { type: "eject" };
      return this.send(data);
    },
    recover: function () {
      return this.ReceiptPrinter.recover();
    },
    reset: function () {
      this.ReceiptPrinter.force = this.force;
      var ret = this.ReceiptPrinter.reset();
      this.force = false;
      return ret;
    },
    startMonitor: function () {
      return this.ReceiptPrinter.startMonitor();
    },
    stopMonitor: function () {
      return this.ReceiptPrinter.stopMonitor();
    },
    client_onreceive: function (res, sq) {
      switch (res.eventtype) {
        case "slipprint":
        case "slipcancel":
          this.SlipPrinter.fireOnReceive(res, sq);
          break;
        case "endorseprint":
        case "endorsecancel":
          this.EndorsePrinter.fireOnReceive(res, sq);
          break;
        case "micrread":
        case "micrcleaning":
        case "micrcancel":
          this.MICRReader.fireOnReceive(res, sq);
          break;
        case "print":
          var tmp = res;
          tmp.eventtype = this.ReceiptPrinter.methodName;
          this.fireOnReceive(tmp, sq);
          break;
        default:
          this.fireOnReceive(res, sq);
          break;
      }
    },
    client_onxmlresult: function (res, sq) {
      this.ReceiptPrinter.fireOnReceive(res, sq);
    },
    fireOnReceive: function (res, sq) {
      if (this.onreceive == null) {
        return;
      }
      if (res == null) {
        return;
      }
      this.onreceive(
        {
          eventtype: res.eventtype,
          success: res.success,
          code: res.code,
          status: res.status,
        },
        sq
      );
    },
    callEvent: function (eventName, data) {
      var eventReq = data;
      eventReq.type = eventName;
      return this.send(eventReq);
    },
    send: function (data) {
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        data,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {}
      return sequence;
    },
  };
  function ReceiptPrinter(parent) {
    this.parent = parent;
    this.methodName = "";
    this.deviceID = this.parent.deviceID;
    this.ePosDev = this.parent.ePosDev;
    this.connectionObj = null;
    this.SUCCESS = "SUCCESS";
    this.CANCEL = "CANCEL";
    this.ERROR_PARAMMETER = "ERROR_PARAMMETER";
    this.ERROR_COMMAND = "ERROR_COMMAND";
    this.ERROR_DEVICE_NOT_FOUND = "DeviceNotFound";
    this.ERROR_DEVICE_BUSY = "ERROR_DEVICE_BUSY";
    this.ERROR_NOT_SUPPORTED = "ERROR_NOT_SUPPORTED";
    this.ERROR_COVER_OPEN = "EPTR_COVER_OPEN";
    this.ERROR_TIMEOUT = "EX_TIMEOUT";
    this.ERROR_AUTOMATICAL = "EPTR_AUTOMATICAL";
    this.ERROR_UNRECOVERABLE = "EPTR_UNRECOVERABLE";
    this.ERROR_BADPORT = "EX_BADPORT";
    this.SYSTEM_ERROR = "SYSTEM_ERROR";
    this.EPTR_CUTTER = "EPTR_CUTTER";
    this.EPTR_MECHANICAL = "EPTR_MECHANICAL";
    this.EPTR_REC_EMPTY = "EPTR_REC_EMPTY";
    this.EPTR_SCHEMAERROR = "SchemaError";
    this.EPTR_PRINT_SYSTEM_ERROR = "PrintSystemError";
  }
  ReceiptPrinter.prototype.setConnectionObject = function (connectionObj) {
    this.connectionObj = connectionObj;
  };
  ReceiptPrinter.prototype = new Printer();
  ReceiptPrinter.prototype.send = function () {
    if (this.methodName == "") {
      this.methodName = "send";
    }
    return Printer.prototype.send.apply(this, arguments);
  };
  ReceiptPrinter.prototype.print = function (canvas, cut, mode) {
    this.methodName = "print";
    return Printer.prototype.print.apply(this, arguments);
  };
  ReceiptPrinter.prototype.recover = function () {
    this.methodName = "recover";
    return Printer.prototype.recover.apply(this, arguments);
  };
  ReceiptPrinter.prototype.reset = function () {
    this.methodName = "reset";
    return Printer.prototype.reset.apply(this, arguments);
  };
  ReceiptPrinter.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
      return;
    }
    var eventtype = this.methodName;
    var success = "false";
    var code = "";
    var status = this.ASB_NO_RESPONSE;
    if (res) {
      var xml = res.resultdata;
      success = /success\s*=\s*"\s*(1|true)\s*"/.test(xml);
      xml.match(/code\s*=\s*"\s*(\S*)\s*"/);
      code = RegExp.$1;
      if (code == "") {
        code = success ? "SUCCESS" : "ERROR_DEVICE_NOT_FOUND";
      }
      xml.match(/status\s*=\s*"\s*(\d+)\s*"/);
      status = parseInt(RegExp.$1);
    }
    if (code == "EX_ENPC_TIMEOUT") {
      code = "ERROR_DEVICE_BUSY";
    }
    this.onreceive(
      { eventtype: eventtype, success: success, code: code, status: status },
      sq
    );
    this.methodName = "";
  };
  function SlipPrinter(parent) {
    this.parent = parent;
    this.SUCCESS = "SUCCESS";
    this.CANCEL = "CANCEL";
    this.ERROR_PARAMMETER = "ERROR_PARAMMETER";
    this.ERROR_COMMAND = "ERROR_COMMAND";
    this.ERROR_DEVICE_NOT_FOUND = "ERROR_DEVICE_NOT_FOUND";
    this.ERROR_DEVICE_BUSY = "ERROR_DEVICE_BUSY";
    this.ERROR_NOT_SUPPORTED = "ERROR_NOT_SUPPORTED";
    this.ERROR_COVER_OPEN = "ERROR_COVER_OPEN";
    this.ERROR_TIMEOUT = "ERROR_TIMEOUT";
    this.ERROR_AUTOMATICAL = "ERROR_AUTOMATICAL";
    this.ERROR_UNRECOVERABLE = "ERROR_UNRECOVERABLE";
    this.ERROR_BADPORT = "ERROR_BADPORT";
    this.SYSTEM_ERROR = "SYSTEM_ERROR";
    this.EPTR_CUTTER = "EPTR_CUTTER";
    this.EPTR_MECHANICAL = "EPTR_MECHANICAL";
    this.EPTR_REC_EMPTY = "EPTR_REC_EMPTY";
    this.EPTR_SCHEMAERROR = "EPTR_SCHEMAERROR";
    this.EPTR_PRINT_SYSTEM_ERROR = "EPTR_PRINT_SYSTEM_ERROR";
  }
  SlipPrinter.prototype = new ePOSBuilder();
  SlipPrinter.prototype.timeout = 60000;
  SlipPrinter.prototype.send = function () {
    var xml = arguments.length < 1 ? this.toString() : arguments[1];
    var data = { type: "slipprint", timeout: this.timeout, printdata: xml };
    var sequence = this.parent.send(data);
    this.setXmlString("");
    return sequence;
  };
  SlipPrinter.prototype.setXmlString = function (xml) {
    this.message = xml;
  };
  SlipPrinter.prototype.getXmlString = function () {
    return this.message;
  };
  SlipPrinter.prototype.cancel = function () {
    var data = { type: "slipcancel" };
    return this.parent.send(data);
  };
  SlipPrinter.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
      return;
    }
    if (res == null) {
      return;
    }
    var eventtype = "";
    switch (res.eventtype) {
      case "slipprint":
        eventtype = "send";
        break;
      case "slipcancel":
        eventtype = "cancel";
        break;
      default:
        break;
    }
    var code = res.code;
    if (code == "EX_ENPC_TIMEOUT") {
      code = "ERROR_DEVICE_BUSY";
    }
    this.onreceive(
      {
        eventtype: eventtype,
        success: res.success,
        code: code,
        status: res.status,
      },
      sq
    );
  };
  function EndorsePrinter(parent) {
    this.parent = parent;
    this.mode40cpl = false;
    this.SUCCESS = "SUCCESS";
    this.CANCEL = "CANCEL";
    this.ERROR_PARAMMETER = "ERROR_PARAMMETER";
    this.ERROR_COMMAND = "ERROR_COMMAND";
    this.ERROR_DEVICE_NOT_FOUND = "ERROR_DEVICE_NOT_FOUND";
    this.ERROR_DEVICE_BUSY = "ERROR_DEVICE_BUSY";
    this.ERROR_NOT_SUPPORTED = "ERROR_NOT_SUPPORTED";
    this.ERROR_COVER_OPEN = "ERROR_COVER_OPEN";
    this.ERROR_TIMEOUT = "ERROR_TIMEOUT";
    this.ERROR_AUTOMATICAL = "ERROR_AUTOMATICAL";
    this.ERROR_UNRECOVERABLE = "ERROR_UNRECOVERABLE";
    this.ERROR_BADPORT = "ERROR_BADPORT";
    this.SYSTEM_ERROR = "SYSTEM_ERROR";
    this.EPTR_CUTTER = "EPTR_CUTTER";
    this.EPTR_MECHANICAL = "EPTR_MECHANICAL";
    this.EPTR_REC_EMPTY = "EPTR_REC_EMPTY";
    this.EPTR_SCHEMAERROR = "EPTR_SCHEMAERROR";
    this.EPTR_PRINT_SYSTEM_ERROR = "EPTR_PRINT_SYSTEM_ERROR";
  }
  EndorsePrinter.prototype = new ePOSBuilder();
  EndorsePrinter.prototype.timeout = 60000;
  EndorsePrinter.prototype.send = function () {
    var xml = arguments.length < 1 ? this.toString() : arguments[1];
    var data = {
      type: "endorseprint",
      is40cplmode: this.mode40cpl,
      timeout: this.timeout,
      printdata: xml,
    };
    var sequence = this.parent.send(data);
    this.setXmlString("");
    return sequence;
  };
  EndorsePrinter.prototype.setXmlString = function (xml) {
    this.message = xml;
  };
  EndorsePrinter.prototype.getXmlString = function () {
    return this.message;
  };
  EndorsePrinter.prototype.cancel = function () {
    var data = { type: "endorsecancel" };
    return this.parent.send(data);
  };
  EndorsePrinter.prototype.enable40cplmode = function (flag) {
    this.mode40cpl = flag;
  };
  EndorsePrinter.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
      return;
    }
    if (res == null) {
      return;
    }
    var eventtype = "";
    switch (res.eventtype) {
      case "endorseprint":
        eventtype = "send";
        break;
      case "endorsecancel":
        eventtype = "cancel";
        break;
      default:
        break;
    }
    var code = res.code;
    if (code == "EX_ENPC_TIMEOUT") {
      code = "ERROR_DEVICE_BUSY";
    }
    this.onreceive(
      {
        eventtype: eventtype,
        success: res.success,
        code: code,
        status: res.status,
      },
      sq
    );
  };
  function MICRReader(parent) {
    this.parent = parent;
    this.timeout = 60000;
    this.FONT_E13B = "MICR_E13B";
    this.FONT_CMC7 = "MICR_CMC7";
    this.SUCCESS = "SUCCESS";
    this.CANCEL = "CANCEL";
    this.ERROR_PARAMMETER = "ERROR_PARAMMETER";
    this.ERROR_COMMAND = "ERROR_COMMAND";
    this.ERROR_DEVICE_NOT_FOUND = "ERROR_DEVICE_NOT_FOUND";
    this.ERROR_DEVICE_BUSY = "ERROR_DEVICE_BUSY";
    this.ERROR_NOT_SUPPORTED = "ERROR_NOT_SUPPORTED";
    this.ERROR_COVER_OPEN = "ERROR_COVER_OPEN";
    this.ERROR_TIMEOUT = "ERROR_TIMEOUT";
    this.ERROR_AUTOMATICAL = "ERROR_AUTOMATICAL";
    this.ERROR_UNRECOVERABLE = "ERROR_UNRECOVERABLE";
    this.ERROR_BADPORT = "ERROR_BADPORT";
    this.SYSTEM_ERROR = "SYSTEM_ERROR";
    this.EMICR_ILLEGAL_LENGTH = "EMICR_ILLEGAL_LENGTH";
    this.EMICR_NO_MICR = "EMICR_NO_MICR";
    this.EMICR_RECOGNITION = "EMICR_RECOGNITION";
    this.EMICR_READ = "EMICR_READ";
    this.EMICR_NOISE_DETECTED = "EMICR_NOISE_DETECTED";
    this.EMICR_COVER_OPENED = "EMICR_COVER_OPENED";
    this.EMICR_PAPER_JAM = "EMICR_PAPER_JAM";
  }
  MICRReader.prototype.read = function (ignoreerror, font) {
    var data = {
      type: "micrread",
      ignoreerror: ignoreerror,
      font: font,
      timeout: this.timeout,
    };
    return this.parent.send(data);
  };
  MICRReader.prototype.cleaning = function () {
    var data = { type: "micrcleaning", timeout: this.timeout };
    return this.parent.send(data);
  };
  MICRReader.prototype.cancel = function () {
    var data = { type: "micrcancel" };
    return this.parent.send(data);
  };
  MICRReader.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
      return;
    }
    if (res == null) {
      return;
    }
    var eventtype = "";
    switch (res.eventtype) {
      case "micrread":
        eventtype = "read";
        break;
      case "micrcleaning":
        eventtype = "cleaning";
        break;
      case "micrcancel":
        eventtype = "cancel";
        break;
      default:
        break;
    }
    var code = res.code;
    if (code == "EX_ENPC_TIMEOUT") {
      code = "ERROR_DEVICE_BUSY";
    }
    this.onreceive(
      {
        eventtype: eventtype,
        success: res.success,
        code: code,
        status: res.status,
        data: res.data,
      },
      sq
    );
  };
  function HybridPrinter2(deviceID, isCrypto, ePOSDeviceContext) {
    this.deviceID = deviceID;
    this.isCrypto = isCrypto;
    this.ePosDev = ePOSDeviceContext;
    this.connectionObj = null;
    this.ReceiptPrinter = null;
    this.SlipPrinter2 = null;
    this.ValidationPrinter = null;
    this.EndorsePrinter2 = null;
    this.MICRReader2 = null;
    this.currentPrinter = null;
    this.isMicrMode = false;
    this.FONT_A = "font_a";
    this.FONT_B = "font_b";
    this.FONT_C = "font_c";
    this.FONT_D = "font_d";
    this.FONT_E = "font_e";
    this.FONT_SPECIAL_A = "special_a";
    this.FONT_SPECIAL_B = "special_b";
    this.ALIGN_LEFT = "left";
    this.ALIGN_CENTER = "center";
    this.ALIGN_RIGHT = "right";
    this.COLOR_NONE = "none";
    this.COLOR_1 = "color_1";
    this.COLOR_2 = "color_2";
    this.COLOR_3 = "color_3";
    this.COLOR_4 = "color_4";
    this.FEED_PEELING = "peeling";
    this.FEED_CUTTING = "cutting";
    this.FEED_CURRENT_TOF = "current_tof";
    this.FEED_NEXT_TOF = "next_tof";
    this.MODE_MONO = "mono";
    this.MODE_GRAY16 = "gray16";
    this.BARCODE_UPC_A = "upc_a";
    this.BARCODE_UPC_E = "upc_e";
    this.BARCODE_EAN13 = "ean13";
    this.BARCODE_JAN13 = "jan13";
    this.BARCODE_EAN8 = "ean8";
    this.BARCODE_JAN8 = "jan8";
    this.BARCODE_CODE39 = "code39";
    this.BARCODE_ITF = "itf";
    this.BARCODE_CODABAR = "codabar";
    this.BARCODE_CODE93 = "code93";
    this.BARCODE_CODE128 = "code128";
    this.BARCODE_GS1_128 = "gs1_128";
    this.BARCODE_GS1_DATABAR_OMNIDIRECTIONAL = "gs1_databar_omnidirectional";
    this.BARCODE_GS1_DATABAR_TRUNCATED = "gs1_databar_truncated";
    this.BARCODE_GS1_DATABAR_LIMITED = "gs1_databar_limited";
    this.BARCODE_GS1_DATABAR_EXPANDED = "gs1_databar_expanded";
    this.BARCODE_CODE128_AUTO = "code128_auto";
    this.HRI_NONE = "none";
    this.HRI_ABOVE = "above";
    this.HRI_BELOW = "below";
    this.HRI_BOTH = "both";
    this.SYMBOL_PDF417_STANDARD = "pdf417_standard";
    this.SYMBOL_PDF417_TRUNCATED = "pdf417_truncated";
    this.SYMBOL_QRCODE_MODEL_1 = "qrcode_model_1";
    this.SYMBOL_QRCODE_MODEL_2 = "qrcode_model_2";
    this.SYMBOL_QRCODE_MICRO = "qrcode_micro";
    this.SYMBOL_MAXICODE_MODE_2 = "maxicode_mode_2";
    this.SYMBOL_MAXICODE_MODE_3 = "maxicode_mode_3";
    this.SYMBOL_MAXICODE_MODE_4 = "maxicode_mode_4";
    this.SYMBOL_MAXICODE_MODE_5 = "maxicode_mode_5";
    this.SYMBOL_MAXICODE_MODE_6 = "maxicode_mode_6";
    this.SYMBOL_GS1_DATABAR_STACKED = "gs1_databar_stacked";
    this.SYMBOL_GS1_DATABAR_STACKED_OMNIDIRECTIONAL =
      "gs1_databar_stacked_omnidirectional";
    this.SYMBOL_GS1_DATABAR_EXPANDED_STACKED = "gs1_databar_expanded_stacked";
    this.SYMBOL_AZTECCODE_FULLRANGE = "azteccode_fullrange";
    this.SYMBOL_AZTECCODE_COMPACT = "azteccode_compact";
    this.SYMBOL_DATAMATRIX_SQUARE = "datamatrix_square";
    this.SYMBOL_DATAMATRIX_RECTANGLE_8 = "datamatrix_rectangle_8";
    this.SYMBOL_DATAMATRIX_RECTANGLE_12 = "datamatrix_rectangle_12";
    this.SYMBOL_DATAMATRIX_RECTANGLE_16 = "datamatrix_rectangle_16";
    this.LEVEL_0 = "level_0";
    this.LEVEL_1 = "level_1";
    this.LEVEL_2 = "level_2";
    this.LEVEL_3 = "level_3";
    this.LEVEL_4 = "level_4";
    this.LEVEL_5 = "level_5";
    this.LEVEL_6 = "level_6";
    this.LEVEL_7 = "level_7";
    this.LEVEL_8 = "level_8";
    this.LEVEL_L = "level_l";
    this.LEVEL_M = "level_m";
    this.LEVEL_Q = "level_q";
    this.LEVEL_H = "level_h";
    this.LEVEL_DEFAULT = "default";
    this.LINE_THIN = "thin";
    this.LINE_MEDIUM = "medium";
    this.LINE_THICK = "thick";
    this.LINE_THIN_DOUBLE = "thin_double";
    this.LINE_MEDIUM_DOUBLE = "medium_double";
    this.LINE_THICK_DOUBLE = "thick_double";
    this.DIRECTION_LEFT_TO_RIGHT = "left_to_right";
    this.DIRECTION_BOTTOM_TO_TOP = "bottom_to_top";
    this.DIRECTION_RIGHT_TO_LEFT = "right_to_left";
    this.DIRECTION_TOP_TO_BOTTOM = "top_to_bottom";
    this.CUT_NO_FEED = "no_feed";
    this.CUT_FEED = "feed";
    this.CUT_RESERVE = "reserve";
    this.DRAWER_1 = "drawer_1";
    this.DRAWER_2 = "drawer_2";
    this.PULSE_100 = "pulse_100";
    this.PULSE_200 = "pulse_200";
    this.PULSE_300 = "pulse_300";
    this.PULSE_400 = "pulse_400";
    this.PULSE_500 = "pulse_500";
    this.PATTERN_NONE = "none";
    this.PATTERN_0 = "pattern_0";
    this.PATTERN_1 = "pattern_1";
    this.PATTERN_2 = "pattern_2";
    this.PATTERN_3 = "pattern_3";
    this.PATTERN_4 = "pattern_4";
    this.PATTERN_5 = "pattern_5";
    this.PATTERN_6 = "pattern_6";
    this.PATTERN_7 = "pattern_7";
    this.PATTERN_8 = "pattern_8";
    this.PATTERN_9 = "pattern_9";
    this.PATTERN_10 = "pattern_10";
    this.PATTERN_A = "pattern_a";
    this.PATTERN_B = "pattern_b";
    this.PATTERN_C = "pattern_c";
    this.PATTERN_D = "pattern_d";
    this.PATTERN_E = "pattern_e";
    this.PATTERN_ERROR = "error";
    this.PATTERN_PAPER_END = "paper_end";
    this.LAYOUT_RECEIPT = "receipt";
    this.LAYOUT_RECEIPT_BM = "receipt_bm";
    this.LAYOUT_LABEL = "label";
    this.LAYOUT_LABEL_BM = "label_bm";
    this.HALFTONE_DITHER = 0;
    this.HALFTONE_ERROR_DIFFUSION = 1;
    this.HALFTONE_THRESHOLD = 2;
    this.ASB_NO_RESPONSE = 1;
    this.ASB_PRINT_SUCCESS = 2;
    this.ASB_DRAWER_KICK = 4;
    this.ASB_OFF_LINE = 8;
    this.ASB_COVER_OPEN = 32;
    this.ASB_PAPER_FEED = 64;
    this.ASB_WAIT_ON_LINE = 256;
    this.ASB_PANEL_SWITCH = 512;
    this.ASB_MECHANICAL_ERR = 1024;
    this.ASB_AUTOCUTTER_ERR = 2048;
    this.ASB_UNRECOVER_ERR = 8192;
    this.ASB_AUTORECOVER_ERR = 16384;
    this.ASB_INSERTION_WAIT_PAPER = 65536;
    this.ASB_RECEIPT_NEAR_END = 131072;
    this.ASB_REMOVAL_WAIT_PAPER = 262144;
    this.ASB_RECEIPT_END = 524288;
    this.ASB_TOF_NOPAPER = 2097152;
    this.ASB_BOF_NOPAPER = 4194304;
    this.ASB_SLIP_NO_SELECT = 16777216;
    this.ASB_SLIP_IMPOSSIBLE_PRINT = 33554432;
    this.ASB_EJD_NOPAPER = 1073741824;
    this.ASB_VALIDATION_NO_SELECT = 67108864;
    this.ASB_VALIDATION_IMPOSSIBLE_PRINT = 134217728;
    this.ASB_SPOOLER_IS_STOPPED = 2147483648;
    this.DRAWER_OPEN_LEVEL_LOW = 0;
    this.DRAWER_OPEN_LEVEL_HIGH = 1;
    this.SUCCESS = "SUCCESS";
    this.CANCEL = "CANCEL";
    this.ERROR_CANCEL_FAILED = "ERROR_CANCEL_FAILED";
    this.ERROR_PARAMMETER = "ERROR_PARAMMETER";
    this.ERROR_COMMAND = "ERROR_COMMAND";
    this.ERROR_DEVICE_NOT_FOUND = "ERROR_DEVICE_NOT_FOUND";
    this.ERROR_DEVICE_BUSY = "ERROR_DEVICE_BUSY";
    this.ERROR_NOT_SUPPORTED = "ERROR_NOT_SUPPORTED";
    this.ERROR_COVER_OPEN = "ERROR_COVER_OPEN";
    this.ERROR_TIMEOUT = "ERROR_TIMEOUT";
    this.ERROR_AUTOMATICAL = "ERROR_AUTOMATICAL";
    this.ERROR_UNRECOVERABLE = "ERROR_UNRECOVERABLE";
    this.ERROR_BADPORT = "ERROR_BADPORT";
    this.SYSTEM_ERROR = "SYSTEM_ERROR";
    this.EPTR_AUTOMATICAL = "EPTR_AUTOMATICAL";
    this.EPTR_COVER_OPEN = "EPTR_COVER_OPEN";
    this.EPTR_CUTTER = "EPTR_CUTTER";
    this.EPTR_MECHANICAL = "EPTR_MECHANICAL";
    this.EPTR_REC_EMPTY = "EPTR_REC_EMPTY";
    this.EPTR_UNRECOVERABLE = "EPTR_UNRECOVERABLE";
    this.EPTR_SCHEMAERROR = "EPTR_SCHEMAERROR";
    this.EPTR_PRINT_SYSTEM_ERROR = "EPTR_PRINT_SYSTEM_ERROR";
    this.EPTR_PAPER_PULLED_OUT = "EPTR_PAPER_PULLED_OUT";
    this.EMICR_ILLEGAL_LENGTH = "EMICR_ILLEGAL_LENGTH";
    this.EMICR_NO_MICR = "EMICR_NO_MICR";
    this.EMICR_RECOGNITION = "EMICR_RECOGNITION";
    this.EMICR_READ = "EMICR_READ";
    this.EMICR_NOISE_DETECTED = "EMICR_NOISE_DETECTED";
    this.EMICR_COVER_OPENED = "EMICR_COVER_OPENED";
    this.EMICR_PAPER_JAM = "EMICR_PAPER_JAM";
    this.EMICR_PAPER_PULLED_OUT = "EMICR_PAPER_PULLED_OUT";
    this.DeviceNotFound = "DeviceNotFound";
    this.EX_TIMEOUT = "EX_TIMEOUT";
    this.EX_BADPORT = "EX_BADPORT";
    this.SchemaError = "SchemaError";
    this.PrintSystemError = "PrintSystemError";
    this.PAPERTYPE_RECEIPT = 0;
    this.PAPERTYPE_SLIP = 1;
    this.PAPERTYPE_ENDORSE = 2;
    this.PAPERTYPE_VALIDATION = 3;
    this.FONT_E13B = "MICR_E13B";
    this.FONT_CMC7 = "MICR_CMC7";
    this.halftone = this.HALFTONE_DITHER;
    this.brightness = 1;
    this.force = false;
    this.drawerOpenLevel = this.DRAWER_OPEN_LEVEL_LOW;
    this.paperType = this.PAPERTYPE_RECEIPT;
    this.interval = 3000;
    this.waitTime = 500;
    this.enable40cplMode = true;
    this.onstatuschange = null;
    this.ononline = null;
    this.onoffline = null;
    this.onpoweroff = null;
    this.oncoveropen = null;
    this.onpaperok = null;
    this.onpapernearend = null;
    this.onpaperend = null;
    this.ondrawerclosed = null;
    this.ondraweropen = null;
    this.init(deviceID);
  }
  HybridPrinter2.prototype.init = function (deviceID) {
    this.deviceID = deviceID;
    this.ReceiptPrinter = new ReceiptPrinter(this);
    this.SlipPrinter2 = new SlipPrinter2(this);
    this.ValidationPrinter = new ValidationPrinter(this);
    this.EndorsePrinter2 = new EndorsePrinter2(this);
    this.MICRReader2 = new MICRReader2(this);
    this.currentPrinter = this.ReceiptPrinter;
    this.ReceiptPrinter.onstatuschange = function (status) {
      if (this.parent.onstatuschange != null) {
        this.parent.onstatuschange(status);
      }
    };
    this.ReceiptPrinter.ononline = function () {
      if (this.parent.ononline != null) {
        this.parent.ononline();
      }
    };
    this.ReceiptPrinter.onoffline = function () {
      if (this.parent.onoffline != null) {
        this.parent.onoffline();
      }
    };
    this.ReceiptPrinter.onpoweroff = function () {
      if (this.parent.onpoweroff != null) {
        this.parent.onpoweroff();
      }
    };
    this.ReceiptPrinter.oncoveropen = function () {
      if (this.parent.oncoveropen != null) {
        this.parent.oncoveropen();
      }
    };
    this.ReceiptPrinter.oncoverok = function () {
      if (this.parent.oncoverok != null) {
        this.parent.oncoverok();
      }
    };
    this.ReceiptPrinter.onpaperok = function () {
      if (this.parent.onpaperok != null) {
        this.parent.onpaperok();
      }
    };
    this.ReceiptPrinter.onpapernearend = function () {
      if (this.parent.onpapernearend != null) {
        this.parent.onpapernearend();
      }
    };
    this.ReceiptPrinter.onpaperend = function () {
      if (this.parent.onpaperend != null) {
        this.parent.onpaperend();
      }
    };
    this.ReceiptPrinter.ondrawerclosed = function () {
      if (this.parent.ondrawerclosed != null) {
        this.parent.ondrawerclosed();
      }
    };
    this.ReceiptPrinter.ondraweropen = function () {
      if (this.parent.ondraweropen != undefined) {
        this.parent.ondraweropen();
      }
    };
    this.ReceiptPrinter.onreceive = function (res, sq) {
      this.parent.fireOnReceive(res, sq);
    };
    this.SlipPrinter2.onreceive = function (res, sq) {
      this.parent.fireOnReceive(res, sq);
    };
    this.EndorsePrinter2.onreceive = function (res, sq) {
      this.parent.fireOnReceive(res, sq);
    };
    this.ValidationPrinter.onreceive = function (res, sq) {
      this.parent.fireOnReceive(res, sq);
    };
    this.MICRReader2.onreceive = function (res, sq) {
      this.parent.fireOnReceive(res, sq);
    };
  };
  HybridPrinter2.prototype.setConnectionObject = function (connectionObj) {
    this.connectionObj = connectionObj;
    this.ReceiptPrinter.setConnectionObject(this.connectionObj);
  };
  HybridPrinter2.prototype.isValidFunction = function (
    paperType,
    supportPaperTypes
  ) {
    var isValid = false;
    var index = 0;
    if (supportPaperTypes.length != 0) {
      for (index = 0; index < supportPaperTypes.length; index++) {
        if (paperType == supportPaperTypes[index]) {
          isValid = true;
          break;
        }
      }
    }
    return isValid;
  };
  HybridPrinter2.prototype.addText = function (data) {
    this.currentPrinter.addText.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addTextLang = function (lang) {
    this.currentPrinter.addTextLang.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addTextAlign = function (align) {
    this.currentPrinter.addTextAlign.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addTextRotate = function (rotate) {
    this.currentPrinter.addTextRotate.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addTextLineSpace = function (linespc) {
    this.currentPrinter.addTextLineSpace.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addTextFont = function (font) {
    this.currentPrinter.addTextFont.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addTextSmooth = function (smooth) {
    this.currentPrinter.addTextSmooth.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addTextDouble = function (dw, dh) {
    this.currentPrinter.addTextDouble.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addTextSize = function (width, height) {
    this.currentPrinter.addTextSize.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addTextStyle = function (reverse, ul, em, color) {
    this.currentPrinter.addTextStyle.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addTextPosition = function (x) {
    this.currentPrinter.addTextPosition.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addTextVPosition = function (y) {
    this.currentPrinter.addTextVPosition.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addFeedUnit = function (unit) {
    this.currentPrinter.addFeedUnit.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addFeedLine = function (line) {
    this.currentPrinter.addFeedLine.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addFeed = function () {
    this.currentPrinter.addFeed.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addFeedPosition = function (pos) {
    this.currentPrinter.addFeedPosition.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addImage = function (
    context,
    x,
    y,
    width,
    height,
    color,
    mode
  ) {
    this.currentPrinter.halftone = this.halftone;
    this.currentPrinter.brightness = this.brightness;
    this.currentPrinter.addImage.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addLogo = function (key1, key2) {
    this.currentPrinter.addLogo.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addBarcode = function (
    data,
    type,
    hri,
    font,
    width,
    height
  ) {
    this.currentPrinter.addBarcode.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addSymbol = function (
    data,
    type,
    level,
    width,
    height,
    size
  ) {
    this.currentPrinter.addSymbol.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addHLine = function (x1, x2, style) {
    this.currentPrinter.addHLine.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addVLineBegin = function (x, style) {
    this.currentPrinter.addVLineBegin.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addVLineEnd = function (x, style) {
    this.currentPrinter.addVLineEnd.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addPageBegin = function () {
    this.currentPrinter.addPageBegin.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addPageEnd = function () {
    this.currentPrinter.addPageEnd.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addPageArea = function (x, y, width, height) {
    this.currentPrinter.addPageArea.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addPageDirection = function (dir) {
    this.currentPrinter.addPageDirection.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addPagePosition = function (x, y) {
    this.currentPrinter.addPagePosition.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addPageLine = function (x1, y1, x2, y2, style) {
    this.currentPrinter.addPageLine.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addPageRectangle = function (x1, y1, x2, y2, style) {
    this.currentPrinter.addPageRectangle.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addCut = function (type) {
    this.ReceiptPrinter.addCut.apply(this.ReceiptPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addPulse = function (drawer, time) {
    this.currentPrinter.addPulse.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addSound = function (pattern, repeat, cycle) {
    this.currentPrinter.addSound.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addLayout = function (
    type,
    width,
    height,
    margin_top,
    margin_bottom,
    offset_cut,
    offset_label
  ) {
    this.ReceiptPrinter.addLayout.apply(this.ReceiptPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addRecovery = function () {
    this.ReceiptPrinter.addRecovery.apply(this.ReceiptPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addReset = function () {
    this.ReceiptPrinter.addReset.apply(this.ReceiptPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.addCommand = function (data) {
    this.currentPrinter.addCommand.apply(this.currentPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.recover = function () {
    this.ReceiptPrinter.recover.apply(this.ReceiptPrinter, arguments);
    return this;
  };
  HybridPrinter2.prototype.reset = function () {
    this.ReceiptPrinter.force = this.force;
    var ret = this.ReceiptPrinter.reset.apply(this.ReceiptPrinter, arguments);
    this.force = false;
    return ret;
  };
  HybridPrinter2.prototype.setMessage = function (message) {
    this.currentPrinter.message = message;
  };
  HybridPrinter2.prototype.getMessage = function () {
    return this.currentPrinter.message;
  };
  HybridPrinter2.prototype.startMonitor = function () {
    var delay = this.interval;
    if (typeof this.interval != "number" || delay < 1000 || 6000 < delay) {
      delay = 3000;
    }
    this.ReceiptPrinter.interval = delay;
    return this.ReceiptPrinter.startMonitor();
  };
  HybridPrinter2.prototype.stopMonitor = function () {
    return this.ReceiptPrinter.stopMonitor();
  };
  HybridPrinter2.prototype.lock = function () {
    var data = { type: "lock" };
    return this.send(data);
  };
  HybridPrinter2.prototype.unlock = function () {
    var data = { type: "unlock" };
    return this.send(data);
  };
  HybridPrinter2.prototype.selectPaperType = function (paperType) {
    if (
      this.isValidFunction(paperType, [
        this.PAPERTYPE_RECEIPT,
        this.PAPERTYPE_SLIP,
        this.PAPERTYPE_ENDORSE,
        this.PAPERTYPE_VALIDATION,
      ]) != true
    ) {
      throw new Error('Property "paperType" is invalid');
    }
    switch (paperType) {
      case this.PAPERTYPE_RECEIPT:
        this.currentPrinter = this.ReceiptPrinter;
        break;
      case this.PAPERTYPE_SLIP:
        this.currentPrinter = this.SlipPrinter2;
        break;
      case this.PAPERTYPE_ENDORSE:
        this.currentPrinter = this.EndorsePrinter2;
        break;
      case this.PAPERTYPE_VALIDATION:
        this.currentPrinter = this.ValidationPrinter;
        break;
      default:
        this.currentPrinter = this.ReceiptPrinter;
        break;
    }
    this.paperType = paperType;
    return this;
  };
  HybridPrinter2.prototype.waitInsertion = function (timeout) {
    if (
      this.isValidFunction(this.paperType, [
        this.PAPERTYPE_SLIP,
        this.PAPERTYPE_ENDORSE,
        this.PAPERTYPE_VALIDATION,
      ]) != true
    ) {
      throw new Error('Property "paperType" is invalid');
    }
    this.currentPrinter.waitTime = this.waitTime;
    var ret = this.currentPrinter.waitInsertion.apply(
      this.currentPrinter,
      arguments
    );
    return ret;
  };
  HybridPrinter2.prototype.cancelInsertion = function () {
    var ret = null;
    if (this.isMicrMode) {
      ret = this.MICRReader2.cancel.apply(this.MICRReader2, arguments);
    } else {
      if (
        this.isValidFunction(this.paperType, [
          this.PAPERTYPE_SLIP,
          this.PAPERTYPE_ENDORSE,
          this.PAPERTYPE_VALIDATION,
        ]) != true
      ) {
        throw new Error('Property "paperType" is invalid');
      }
      ret = this.currentPrinter.cancel.apply(this.currentPrinter, arguments);
    }
    return ret;
  };
  HybridPrinter2.prototype.ejectPaper = function () {
    var data = { type: "eject" };
    return this.send(data);
  };
  HybridPrinter2.prototype.sendData = function (timeout) {
    this.currentPrinter.isCrypto = this.isCrypto;
    if (typeof timeout != "number" || timeout < 1 || timeout > 1000000) {
      this.currentPrinter.timeout = 0;
    } else {
      this.currentPrinter.timeout = timeout;
    }
    this.EndorsePrinter2.enable40cplmode(this.enable40cplMode);
    this.currentPrinter.force = this.force;
    var ret = this.currentPrinter.send();
    this.force = false;
    return ret;
  };
  HybridPrinter2.prototype.print = function (canvas, cut, mode, timeout) {
    if (typeof timeout != "number" || timeout < 1 || timeout > 1000000) {
      this.ReceiptPrinter.timeout = 0;
    } else {
      this.ReceiptPrinter.timeout = timeout;
    }
    this.ReceiptPrinter.print.apply(this.ReceiptPrinter, [canvas, cut, mode]);
    return this;
  };
  HybridPrinter2.prototype.readMicrData = function (
    ignoreerror,
    micrFont,
    timeout
  ) {
    var ignoreerrorMicr = ignoreerror;
    var micrFontMicr = micrFont;
    if (typeof ignoreerror == "undefined") {
      ignoreerrorMicr = true;
    }
    if (typeof micrFont == "undefined") {
      micrFontMicr = this.FONT_E13B;
    }
    this.MICRReader2.timeout = timeout;
    this.MICRReader2.waitTime = this.waitTime;
    this.MICRReader2.read.apply(this.MICRReader2, [
      ignoreerrorMicr,
      micrFontMicr,
    ]);
    this.isMicrMode = true;
    return this;
  };
  HybridPrinter2.prototype.cleanMicrReader = function (timeout) {
    this.MICRReader2.timeout = timeout;
    this.MICRReader2.cleaning.apply(this.MICRReader2, []);
    this.isMicrMode = true;
    return this;
  };
  HybridPrinter2.prototype.client_onreceive = function (res, sq) {
    switch (res.eventtype) {
      case "slipprint2":
      case "slipcancel":
      case "slipwaitinsertion":
        this.SlipPrinter2.fireOnReceive(res, sq);
        break;
      case "endorseprint2":
      case "endorsecancel":
      case "endorsewaitinsertion":
        this.EndorsePrinter2.fireOnReceive(res, sq);
        break;
      case "validationprint2":
      case "validationcancel":
      case "validationwaitinsertion":
        this.ValidationPrinter.fireOnReceive(res, sq);
        break;
      case "micrread":
      case "micrcleaning":
      case "micrcancel":
        this.MICRReader2.fireOnReceive(res, sq);
        break;
      case "print":
        var tmp = res;
        tmp.eventtype = this.ReceiptPrinter.methodName;
        this.fireOnReceive(tmp, sq);
        break;
      default:
        this.fireOnReceive(res, sq);
        break;
    }
  };
  HybridPrinter2.prototype.client_onxmlresult = function (res, sq) {
    this.ReceiptPrinter.fireOnReceive(res, sq);
  };
  HybridPrinter2.prototype.fireOnReceive = function (res, sq) {
    if (typeof this.onreceive == undefined) {
      return;
    }
    if (res == null) {
      return;
    }
    var eventtype = res.eventtype;
    var success = res.success;
    var code = res.code;
    var status = res.status;
    var data = res.data;
    switch (res.eventtype) {
      case "send":
        eventtype = "sendData";
        if (code == this.SUCCESS) {
          this.isMicrMode = false;
        }
        break;
      case "waitinsertion":
        eventtype = "waitInsertion";
        if (code == this.SUCCESS) {
          this.isMicrMode = false;
        }
        break;
      case "read":
        eventtype = "readMicrData";
        if (code == this.SUCCESS) {
          this.isMicrMode = true;
        }
        break;
      case "cleaning":
        eventtype = "cleanMicrReader";
        if (code == this.SUCCESS) {
          this.isMicrMode = true;
        }
        break;
      case "cancel":
        eventtype = "cancelInsertion";
        break;
      case "eject":
        eventtype = "ejectPaper";
        if (code == this.SUCCESS) {
          this.isMicrMode = false;
        }
        break;
      default:
        break;
    }
    switch (code) {
      case "EX_ENPC_TIMEOUT":
        code = "ERROR_DEVICE_BUSY";
        break;
      case "CANCEL":
        this.isMicrMode = false;
        break;
      default:
        break;
    }
    this.onreceive(
      {
        method: eventtype,
        success: success,
        code: code,
        status: status,
        data: data,
      },
      sq
    );
  };
  HybridPrinter2.prototype.callEvent = function (eventName, data) {
    var eventReq = data;
    eventReq.type = eventName;
    return this.send(eventReq);
  };
  HybridPrinter2.prototype.send = function (data) {
    var eposmsg = MessageFactory.getDeviceDataMessage(
      this.deviceID,
      data,
      this.isCrypto
    );
    var sequence = -1;
    try {
      this.connectionObj.emit(eposmsg);
      sequence = eposmsg.sequence;
    } catch (e) {}
    return sequence;
  };
  function SlipPrinter2(parent) {
    this.parent = parent;
  }
  SlipPrinter2.prototype = new SlipPrinter();
  SlipPrinter2.prototype.timeout = 60000;
  SlipPrinter2.prototype.waitTime = 500;
  SlipPrinter2.prototype.send = function () {
    var xml = null;
    if (arguments.length < 1) {
      xml = this.toString();
    } else {
      xml = arguments[1];
    }
    if (
      typeof this.timeout != "number" ||
      this.timeout < 5000 ||
      this.timeout > 1000000
    ) {
      this.timeout = 10000;
    }
    var data = { type: "slipprint2", timeout: this.timeout, printdata: xml };
    var sequence = this.parent.send(data);
    this.setXmlString("");
    return sequence;
  };
  SlipPrinter2.prototype.setXmlString = function (xml) {
    this.message = xml;
  };
  SlipPrinter2.prototype.getXmlString = function () {
    return this.message;
  };
  SlipPrinter2.prototype.waitInsertion = function (timeout) {
    if (typeof timeout != "number" || timeout < 5000 || timeout > 900000) {
      this.timeout = 60000;
    } else {
      this.timeout = timeout;
    }
    var slipWaitTime = this.waitTime;
    if (
      typeof this.waitTime != "number" ||
      this.waitTime < 0 ||
      this.waitTime > 6400
    ) {
      slipWaitTime = 500;
    }
    var data = {
      type: "slipwaitinsertion",
      timeout: this.timeout,
      waittime: slipWaitTime,
    };
    return this.parent.send(data);
  };
  SlipPrinter2.prototype.cancel = function () {
    var data = { type: "slipcancel" };
    return this.parent.send(data);
  };
  SlipPrinter2.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
      return;
    }
    if (res == null) {
      return;
    }
    var eventtype = "";
    switch (res.eventtype) {
      case "slipprint2":
        eventtype = "send";
        break;
      case "slipcancel":
        eventtype = "cancel";
        break;
      case "slipwaitinsertion":
        eventtype = "waitinsertion";
        break;
      default:
        break;
    }
    this.onreceive(
      {
        eventtype: eventtype,
        success: res.success,
        code: res.code,
        status: res.status,
      },
      sq
    );
  };
  function EndorsePrinter2(parent) {
    this.parent = parent;
    this.mode40cpl = false;
  }
  EndorsePrinter2.prototype = new EndorsePrinter();
  EndorsePrinter2.prototype.timeout = 60000;
  EndorsePrinter2.prototype.waitTime = 500;
  EndorsePrinter2.prototype.send = function () {
    var xml = null;
    if (arguments.length < 1) {
      xml = this.toString();
    } else {
      xml = arguments[1];
    }
    if (
      typeof this.timeout != "number" ||
      this.timeout < 60000 ||
      this.timeout > 900000
    ) {
      this.timeout = 60000;
    }
    var data = {
      type: "endorseprint2",
      is40cplmode: this.mode40cpl,
      timeout: this.timeout,
      printdata: xml,
    };
    var sequence = this.parent.send(data);
    this.setXmlString("");
    return sequence;
  };
  EndorsePrinter2.prototype.setXmlString = function (xml) {
    this.message = xml;
  };
  EndorsePrinter2.prototype.getXmlString = function () {
    return this.message;
  };
  EndorsePrinter2.prototype.waitInsertion = function (timeout) {
    if (typeof timeout != "number" || timeout < 5000 || timeout > 900000) {
      this.timeout = 60000;
    } else {
      this.timeout = timeout;
    }
    var endorseWaitTime = this.waitTime;
    if (
      typeof this.waitTime != "number" ||
      this.waitTime < 0 ||
      this.waitTime > 6400
    ) {
      endorseWaitTime = 500;
    }
    var data = {
      type: "endorsewaitinsertion",
      timeout: this.timeout,
      waittime: endorseWaitTime,
    };
    return this.parent.send(data);
  };
  EndorsePrinter2.prototype.cancel = function () {
    var data = { type: "endorsecancel" };
    return this.parent.send(data);
  };
  EndorsePrinter2.prototype.enable40cplmode = function (flag) {
    this.mode40cpl = flag;
  };
  EndorsePrinter2.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
      return;
    }
    if (res == null) {
      return;
    }
    var eventtype = "";
    switch (res.eventtype) {
      case "endorseprint2":
        eventtype = "send";
        break;
      case "endorsecancel":
        eventtype = "cancel";
        break;
      case "endorsewaitinsertion":
        eventtype = "waitinsertion";
        break;
      default:
        break;
    }
    this.onreceive(
      {
        eventtype: eventtype,
        success: res.success,
        code: res.code,
        status: res.status,
      },
      sq
    );
  };
  function MICRReader2(parent) {
    this.parent = parent;
  }
  MICRReader2.prototype = new MICRReader();
  MICRReader2.prototype.waitTime = 500;
  MICRReader2.prototype.read = function (ignoreerror, font) {
    if (
      typeof this.timeout != "number" ||
      this.timeout < 5000 ||
      this.timeout > 900000
    ) {
      this.timeout = 60000;
    }
    var micrWaitTime = this.waitTime;
    if (
      typeof this.waitTime != "number" ||
      this.waitTime < 0 ||
      this.waitTime > 6400
    ) {
      micrWaitTime = 500;
    }
    var data = {
      type: "micrread",
      ignoreerror: ignoreerror,
      font: font,
      timeout: this.timeout,
      waittime: micrWaitTime,
    };
    return this.parent.send(data);
  };
  MICRReader2.prototype.cleaning = function () {
    var micrWaitTime = this.waitTime;
    this.timeout = 60000;
    if (
      typeof this.waitTime != "number" ||
      this.waitTime < 0 ||
      this.waitTime > 6400
    ) {
      micrWaitTime = 500;
    }
    var data = {
      type: "micrcleaning",
      timeout: this.timeout,
      waittime: micrWaitTime,
    };
    return this.parent.send(data);
  };
  function ValidationPrinter(parent) {
    this.parent = parent;
  }
  ValidationPrinter.prototype = new ePOSBuilder();
  ValidationPrinter.prototype.timeout = 10000;
  ValidationPrinter.prototype.waitTime = 500;
  ValidationPrinter.prototype.send = function () {
    var xml = null;
    if (arguments.length < 1) {
      xml = this.toString();
    } else {
      xml = arguments[1];
    }
    if (
      typeof this.timeout != "number" ||
      this.timeout < 5000 ||
      this.timeout > 1000000
    ) {
      this.timeout = 10000;
    }
    var data = {
      type: "validationprint2",
      timeout: this.timeout,
      printdata: xml,
    };
    var sequence = this.parent.send(data);
    this.setXmlString("");
    return sequence;
  };
  ValidationPrinter.prototype.setXmlString = function (xml) {
    this.message = xml;
  };
  ValidationPrinter.prototype.getXmlString = function () {
    return this.message;
  };
  ValidationPrinter.prototype.waitInsertion = function (timeout) {
    if (typeof timeout != "number" || timeout < 5000 || timeout > 900000) {
      this.timeout = 60000;
    } else {
      this.timeout = timeout;
    }
    var validationWaitTime = this.waitTime;
    if (
      typeof this.waitTime != "number" ||
      this.waitTime < 0 ||
      this.waitTime > 6400
    ) {
      validationWaitTime = 500;
    }
    var data = {
      type: "validationwaitinsertion",
      timeout: this.timeout,
      waittime: validationWaitTime,
    };
    return this.parent.send(data);
  };
  ValidationPrinter.prototype.cancel = function () {
    var data = { type: "validationcancel" };
    return this.parent.send(data);
  };
  ValidationPrinter.prototype.fireOnReceive = function (res, sq) {
    if (this.onreceive == null) {
      return;
    }
    if (res == null) {
      return;
    }
    var eventtype = "";
    switch (res.eventtype) {
      case "validationprint2":
        eventtype = "send";
        break;
      case "validationcancel":
        eventtype = "cancel";
        break;
      case "validationwaitinsertion":
        eventtype = "waitinsertion";
        break;
      default:
        break;
    }
    this.onreceive(
      {
        eventtype: eventtype,
        success: res.success,
        code: res.code,
        status: res.status,
      },
      sq
    );
  };
  function Scanner(deviceID, isCrypto) {
    this.deviceID = deviceID;
    this.isCrypto = isCrypto;
    this.connectionObj = null;
  }
  Scanner.prototype = {
    setConnectionObject: function (connectionObj) {
      this.connectionObj = connectionObj;
    },
    client_ondata: function (data) {
      try {
        if (this.ondata == null) {
          return;
        }
        this.ondata(data);
      } catch (e) {}
      return;
    },
    client_onbinarydata: function (data) {
      try {
        if (this.onbinarydata == null) {
          return;
        }
        this.onbinarydata(data);
      } catch (e) {}
      return;
    },
    client_setbinarymode: function (data) {
      try {
        if (this.onbinarymode == null) {
          return;
        }
        this.onbinarymode(data);
      } catch (e) {}
      return;
    },
    setBinaryMode: function (enable) {
      var str = "";
      if (enable == true) {
        str = "true";
      } else {
        str = "false";
      }
      var data = { type: "setbinarymode", binarymode: str };
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        data,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {}
      return sequence;
    },
    callEvent: function (eventName, data) {
      var eventReq = data;
      eventReq.type = eventName;
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        eventReq,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {}
      return sequence;
    },
  };
  function SimpleSerial(deviceID, isCrypto) {
    this.deviceID = deviceID;
    this.isCrypto = isCrypto;
    this.connectionObj = null;
  }
  SimpleSerial.prototype = {
    setConnectionObject: function (connectionObj) {
      this.connectionObj = connectionObj;
    },
    sendCommand: function (command) {
      var data = { type: "sendcommand", command: toHexBinary(command) };
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        data,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {}
      return sequence;
    },
    client_oncommandreply: function (data) {
      try {
        if (this.oncommandreply == null) {
          return;
        }
        var hexData = data.data;
        hexData = hexData.replace(/[0-9a-fA-F]{2}/g, function (c) {
          var hexNum = parseInt(c, 16);
          return String.fromCharCode(hexNum);
        });
        data.data = hexData;
        this.oncommandreply(data);
      } catch (e) {}
      return;
    },
  };
  function GermanyFiscalElement(deviceID, isCrypto) {
    this.deviceID = deviceID;
    this.isCrypto = isCrypto;
    this.connectionObj = null;
    this.ongfereceive = null;
    this.onerror = null;
  }
  GermanyFiscalElement.prototype = {
    setConnectionObject: function (connectionObj) {
      this.connectionObj = connectionObj;
    },
    operate: function (jsonString, timeout) {
      var data = { type: "operate", timeout: timeout, requestdata: jsonString };
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        data,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {
        throw e;
      }
      return sequence;
    },
    client_operateresult: function (data) {
      if (this.ongfereceive == null) {
        return;
      }
      if (data.resultformat == "Base64-encoded") {
        try {
          data.resultdata = window.atob(data.resultdata);
          var uint8array = new Uint8Array(data.resultdata.length);
          for (var i = 0; i < data.resultdata.length; i++) {
            uint8array[i] = data.resultdata.charCodeAt(i);
          }
          var inflate = new Zlib.Inflate(uint8array);
          var charData = inflate.decompress();
          data.resultdata = [];
          for (var j = 0; j < charData.length; j++) {
            data.resultdata =
              data.resultdata + String.fromCharCode(charData[j]);
          }
        } catch (e) {
          if (this.onerror) {
            this.onerror(e);
          }
          return;
        }
      }
      try {
        this.ongfereceive(this.getResultObject(data));
      } catch (e) {
        if (this.onerror) {
          this.onerror(e);
        }
      }
      return;
    },
    getResultObject: function (data) {
      return {
        success: data.success,
        code: data.code,
        resultdata: data.resultdata,
      };
    },
    callEvent: function (eventName, data) {
      var eventReq = { type: eventName, data: data };
      var eposmsg = MessageFactory.getDeviceDataMessage(
        this.deviceID,
        data,
        this.isCrypto
      );
      var sequence = -1;
      try {
        this.connectionObj.emit(eposmsg);
        sequence = eposmsg.sequence;
      } catch (e) {}
      return sequence;
    },
  };
  function Ofsc() {
    this.SERVICE_ID = "OFSC";
    this.callback = null;
    this.connectionObj = null;
  }
  Ofsc.prototype = {
    setConnectionObject: function (connectionObj) {
      this.connectionObj = connectionObj;
    },
    send: function (xml, timeout, crypto, callback) {
      this.callback = callback;
      try {
        if (this.connectionObj.isUsableDeviceIF()) {
          var data = { type: "print", timeout: timeout, printdata: xml };
          var eposmsg = MessageFactory.getServiceMessage(
            this.SERVICE_ID,
            crypto,
            data
          );
          this.connectionObj.emit(eposmsg);
        }
      } catch (e) {
        return;
      }
    },
    notify: function (eposmsg) {
      var data = null;
      if (eposmsg.isCrypto == "1") {
        data = MessageFactory.decrypt(eposmsg.data);
      } else {
        data = eposmsg.data;
      }
      if (this.callback != null) {
        this.callback(data.resultdata);
      }
    },
    onxmlresult: function (xml) {
      if (this.callback != null) {
        this.callback(xml);
      }
    },
  };
  function CookieIO() {
    this.TAG = "EPSON_EPOSDEVICE_CLIENTID";
    this.EXPIRES_MINUTES = 5;
  }
  CookieIO.prototype = {
    writeId: function (value, address) {
      if (address == "") {
        return;
      }
      var encodedAddress = encodeURIComponent(address);
      var encodedTitle = encodeURIComponent(document.title);
      var hostname = location.hostname;
      var expired = this.getExpiredDate();
      document.cookie =
        this.TAG +
        "_" +
        hostname +
        "_" +
        encodedAddress +
        "_" +
        encodedTitle +
        "=" +
        encodeURIComponent(value) +
        "; expires=" +
        expired;
    },
    readId: function (address) {
      var id = "";
      var strCookie = document.cookie + ";";
      var encodedAddress = encodeURIComponent(address);
      var encodedTitle = encodeURIComponent(document.title);
      var hostname = location.hostname;
      var searchKey =
        this.TAG +
        "_" +
        hostname +
        "_" +
        encodedAddress +
        "_" +
        encodedTitle +
        "=";
      var keyValueFrom = strCookie.indexOf(searchKey);
      if (keyValueFrom != -1) {
        keyValueFrom += searchKey.length;
        var keyValueTo = strCookie.indexOf(";", keyValueFrom);
        id = decodeURIComponent(strCookie.substring(keyValueFrom, keyValueTo));
      }
      return id;
    },
    getExpiredDate: function () {
      var expire = new Date();
      var nTime = expire.getTime();
      expire.setTime(nTime + 1000 * 60 * this.EXPIRES_MINUTES);
      return expire.toUTCString();
    },
  };
  function DeviceObjElement(deviceId, isCrypto, deviceObject, callback) {
    this.deviceId = deviceId;
    this.isCrypto = isCrypto;
    this.deviceObject = deviceObject;
    this.callback = callback;
  }
  function DeviceObjElementMap() {
    this.elementList = new Array();
  }
  DeviceObjElementMap.prototype = {
    add: function (element) {
      this.elementList.push(element);
    },
    get: function (deviceId) {
      var element = null;
      for (var i = 0; i < this.elementList.length; i++) {
        if (this.elementList[i].deviceId == deviceId) {
          element = this.elementList[i];
          break;
        }
      }
      return element;
    },
    getByObj: function (deviceObject) {
      var element = null;
      for (var i = 0; i < this.elementList.length; i++) {
        if (this.elementList[i].deviceObject == deviceObject) {
          element = this.elementList[i];
          break;
        }
      }
      return element;
    },
    remove: function (deviceId) {
      for (var i = 0; i < this.elementList.length; i++) {
        if (this.elementList[i].deviceId == deviceId) {
          this.elementList.splice(i, 1);
          break;
        }
      }
    },
    removeAll: function () {
      this.elementList = [];
    },
    getElementList: function () {
      return this.elementList;
    },
  };
  function ePOSDevice() {
    this.DEVICE_TYPE_SCANNER = "type_scanner";
    this.DEVICE_TYPE_KEYBOARD = "type_keyboard";
    this.DEVICE_TYPE_POSKEYBOARD = "type_poskeyboard";
    this.DEVICE_TYPE_MSR = "type_msr";
    this.DEVICE_TYPE_CAT = "type_cat";
    this.DEVICE_TYPE_CASH_CHANGER = "type_cash_changer";
    this.DEVICE_TYPE_PRINTER = "type_printer";
    this.DEVICE_TYPE_DISPLAY = "type_display";
    this.DEVICE_TYPE_SIMPLE_SERIAL = "type_simple_serial";
    this.DEVICE_TYPE_HYBRID_PRINTER = "type_hybrid_printer";
    this.DEVICE_TYPE_HYBRID_PRINTER2 = "type_hybrid_printer2";
    this.DEVICE_TYPE_DT = "type_dt";
    this.DEVICE_TYPE_OTHER_PERIPHERAL = "type_other_peripheral";
    this.DEVICE_TYPE_GFE = "type_storage";
    this.RESULT_OK = "OK";
    this.ERROR_SYSTEM = "SYSTEM_ERROR";
    this.ERROR_DEVICE_IN_USE = "DEVICE_IN_USE";
    this.ERROR_DEVICE_OPEN = "DEVICE_OPEN_ERROR";
    this.ERROR_DEVICE_CLOSE = "DEVICE_CLOSE_ERROR";
    this.ERROR_DEVICE_NOT_OPEN = "DEVICE_NOT_OPEN";
    this.ERROR_DEVICE_NOT_FOUND = "DEVICE_NOT_FOUND";
    this.ERROR_PARAMETER = "ERROR_PARAMETER";
    this.IFPORT_EPOSDEVICE = 8008;
    this.IFPORT_EPOSDEVICE_S = 8043;
    this.CONNECT_TIMEOUT = 15000;
    this.RECONNECT_TIMEOUT = 3000;
    this.MAX_RECONNECT_RETRY = 5;
    this.socket = null;
    this.connectionId = null;
    this.reconnectTimerId = null;
    this.reconnectTryCount = 0;
    this.admin = "";
    this.location = "";
    this.recievedDataId = 0;
    this.connectStartTime = 0;
    this.waitRetryConnectId = 0;
    this.conectionObj = new Connection();
    this.commBoxManager = new CommBoxManager();
    this.commBoxManager.setConnectionObject(this.conectionObj);
    this.devObjSelector = new DeviceObjectSelector();
    this.devObjSelector.setConnectionObject(this.conectionObj);
    this.devObjElmMap = new DeviceObjElementMap();
    this.ofsc = new Ofsc();
    this.ofsc.setConnectionObject(this.conectionObj);
    this.cookieIo = new CookieIO();
    this.gbox = new SocketGarbageBox();
    this.eposprint = false;
    this.cbCheckEposPrintService = null;
    var self = this;
    window.onbeforeunload = function () {
      self.disconnect();
    };
    window.onpagehide = function () {
      self.disconnect();
    };
  }
  ePOSDevice.prototype = {
    connect: function (address, port, callback, options) {
      if (
        this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE) !=
          this.conectionObj.DISCONNECT ||
        this.conectionObj.status(this.conectionObj.IF_EPOSPRINT) !=
          this.conectionObj.DISCONNECT
      ) {
        this.disconnect();
      }
      this.connectStartTime = new Date().getTime();
      var protocol = port == this.IFPORT_EPOSDEVICE ? "http" : "https";
      this.conectionObj.setAddress(protocol, address, port);
      this.conectionObj.registCallback(callback);
      if (arguments.length >= 4) {
        this.eposprint = options.eposprint;
      } else {
        this.eposprint = false;
      }
      var self = this;
      if (this.eposprint) {
        var selfofProb = this.conectionObj;
        this.conectionObj.probeWebServiceIF(function (accessTime) {
          var result = self.ERROR_PARAMETER;
          if (selfofProb.isUsablePrintIF()) {
            result = self.RESULT_OK;
          }
          callback(result);
        });
      } else {
        this.connectBySocketIo(this.CONNECT_TIMEOUT);
      }
    },
    isConnected: function () {
      var devIsConnect = false;
      var wsIsConnect = false;
      switch (this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE)) {
        case this.conectionObj.CONNECT:
        case this.conectionObj.RECONNECTING:
          devIsConnect = true;
          break;
        case this.conectionObj.DISCONNECT:
          break;
      }
      if (
        this.conectionObj.status(this.conectionObj.IF_EPOSPRINT) ==
        this.conectionObj.CONNECT
      ) {
        wsIsConnect = true;
      }
      return devIsConnect | wsIsConnect;
    },
    disconnect: function () {
      var eposmsg = MessageFactory.getDisconnectMessage(this.connectionId);
      this.conectionObj.emit(eposmsg);
      this.cleanup();
    },
    createDevice: function (deviceId, deviceType, options, callback) {
      try {
        if (!this.isConnected()) {
          throw new Error(this.ERROR_SYSTEM);
        }
        if (this.devObjElmMap.get(deviceId) != null) {
          throw new Error(this.ERROR_DEVICE_IN_USE);
        }
        if (!this.devObjSelector.isSelectable(deviceType)) {
          throw new Error(this.ERROR_DEVICE_NOT_FOUND);
        }
        var isCrypto = false;
        var isBufferEnable = false;
        if (typeof options == "boolean") {
          isCrypto = options;
        } else {
          if (typeof options.crypto == "boolean") {
            isCrypto = options.crypto;
          }
          if (typeof options.buffer == "boolean") {
            isBufferEnable = options.buffer;
          }
        }
        if (deviceType == this.DEVICE_TYPE_DT) {
          isCrypto = true;
          deviceId = "local_dt";
        }
        var deviceObject = this.devObjSelector.select(
          deviceId,
          deviceType,
          options.driver,
          isCrypto,
          this
        );
        deviceObject.setConnectionObject(this.conectionObj);
        var element = new DeviceObjElement(
          deviceId,
          isCrypto,
          deviceObject,
          callback
        );
        this.devObjElmMap.add(element);
        if (this.conectionObj.isUsableDeviceIF()) {
          var eposmsg = MessageFactory.getOpenDeviceMessage(
            deviceId,
            deviceType,
            isCrypto,
            isBufferEnable
          );
          this.conectionObj.emit(eposmsg);
        } else {
          var self = this;
          this.checkEposPrintService(deviceId, deviceType, function (result) {
            if (result == self.RESULT_OK) {
              callback(deviceObject, self.RESULT_OK);
            } else {
              callback(null, self.ERROR_DEVICE_NOT_FOUND);
            }
          });
        }
      } catch (e) {
        var message = e.message;
        if (message == null || message == "") {
          message = this.ERROR_DEVICE_OPEN;
        }
        if (callback != null) {
          callback(null, message);
        }
      }
    },
    deleteDevice: function (deviceObject, callback) {
      try {
        var element = this.devObjElmMap.getByObj(deviceObject);
        if (element == null) {
          throw new Error(this.ERROR_DEVICE_NOT_OPEN);
        }
        if (this.conectionObj.isUsableDeviceIF()) {
          element.callback = callback;
          var eposmsg = MessageFactory.getCloseDeviceMessage(element.deviceId);
          this.conectionObj.emit(eposmsg);
        } else {
          try {
            deviceObject.finalize();
          } catch (e) {}
          this.devObjElmMap.remove(element.deviceId);
          callback(this.RESULT_OK);
        }
      } catch (e) {
        var message = e.message;
        if (message == null || message == "") {
          message = this.ERROR_DEVICE_CLOSE;
        }
        if (callback != null) {
          callback(message);
        }
      }
    },
    getAdmin: function () {
      return this.admin;
    },
    getLocation: function () {
      return this.location;
    },
    sendOfscXml: function (xml, timeout, crypto, callback) {
      this.ofsc.send(xml, timeout, crypto, callback);
    },
    getCommBoxManager: function () {
      if (
        this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE) !=
        this.conectionObj.CONNECT
      ) {
        return null;
      }
      return this.commBoxManager;
    },
    cleanup: function () {
      if (this.waitRetryConnectId != 0) {
        clearTimeout(this.waitRetryConnectId);
        this.waitRetryConnectId = 0;
      }
      this.connectStartTime = 0;
      this.gbox.stock(this.socket);
      this.gbox.dispose();
      var devObjList = this.devObjElmMap.getElementList();
      devObjList.forEach(function (obj) {
        try {
          obj.deviceObject.finalize();
        } catch (e) {}
      });
      devObjList = null;
      this.devObjElmMap.removeAll();
      if (
        this.ondisconnect != null &&
        (this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE) !=
          this.conectionObj.DISCONNECT ||
          this.conectionObj.status(this.conectionObj.IF_EPOSPRINT) !=
            this.conectionObj.DISCONNECT)
      ) {
        this.ondisconnect();
      }
      this.cookieIo.writeId("", this.conectionObj.address_p);
      this.conectionObj.changeStatus(
        this.conectionObj.IF_ALL,
        this.conectionObj.DISCONNECT
      );
      this.socket = null;
      this.conectionObj.setSocket(null);
      this.connectionId = null;
      this.conectionObj.setAddress("", "", "");
      if (this.reconnectTimerId != null) {
        clearInterval(this.reconnectTimerId);
      }
      this.reconnectTimerId = null;
      this.reconnectTryCount = 0;
      this.admin = "";
      this.location = "";
      this.recievedDataId = 0;
      this.eposprint = false;
    },
    connectBySocketIo: function (timeout) {
      var selfofProb = this.conectionObj;
      var url = selfofProb.getSocketIoURL();
      this.socket = io.connect(url, {
        reconnect: false,
        "connect timeout": timeout,
        "force new connection": true,
      });
      this.conectionObj.setSocket(this.socket);
      var self = this;
      this.socket.on("connect", function (data) {
        try {
          self.gbox.dispose();
        } catch (e) {}
      });
      this.socket.on("close", function () {
        selfofProb.changeStatus(
          selfofProb.IF_EPOSDEVICE,
          tselfofProb.DISCONNECT
        );
      });
      this.socket.on("disconnect", function (data) {
        try {
          if (
            selfofProb.status(selfofProb.IF_EPOSDEVICE) ==
            selfofProb.RECONNECTING
          ) {
            return;
          } else {
            if (
              self.cookieIo.readId(self.conectionObj.address_p) == "" &&
              self.connectionId == null
            ) {
              self.cleanup();
            } else {
              self.startReconnectAction();
            }
          }
        } catch (e) {}
      });
      this.socket.on("error", function () {
        try {
          selfofProb.probeWebServiceIF(function (accessTime) {
            if (selfofProb.isUsablePrintIF()) {
              self.eposprint = true;
              selfofProb.registIFAccessResult(
                selfofProb.IF_EPOSDEVICE,
                selfofProb.ACCESS_NONE
              );
            } else {
              selfofProb.changeStatus(
                selfofProb.IF_EPOSDEVICE,
                selfofProb.DISCONNECT
              );
              selfofProb.registIFAccessResult(
                selfofProb.IF_EPOSDEVICE,
                selfofProb.ACCESS_TIMEOUT
              );
            }
          });
        } catch (e) {}
      });
      this.socket.on("connect_failed", function () {
        try {
          selfofProb.probeWebServiceIF(function (accessTime) {
            if (selfofProb.isUsablePrintIF()) {
              self.eposprint = true;
              selfofProb.registIFAccessResult(
                selfofProb.IF_EPOSDEVICE,
                selfofProb.ACCESS_NONE
              );
            } else {
              selfofProb.changeStatus(
                selfofProb.IF_EPOSDEVICE,
                selfofProb.DISCONNECT
              );
              selfofProb.registIFAccessResult(
                selfofProb.IF_EPOSDEVICE,
                selfofProb.ACCESS_TIMEOUT
              );
            }
          });
        } catch (e) {}
      });
      this.socket.on("message", function (data) {
        try {
          var eposmsg = MessageFactory.parseRequestMessage(data);
          if (eposmsg.data_id != "") {
            self.recievedDataId = eposmsg.data_id;
          }
          switch (eposmsg.request) {
            case eposmsg.REQUEST.CONNECT:
              self.procConnect(eposmsg);
              break;
            case eposmsg.REQUEST.PUBKEY:
              self.procPubkey(eposmsg);
              break;
            case eposmsg.REQUEST.ADMININFO:
              self.procAdminInfo(eposmsg);
              break;
            case eposmsg.REQUEST.RECONNECT:
              self.procReconnect(eposmsg);
              break;
            case eposmsg.REQUEST.DISCONNECT:
              self.procDisconnect(eposmsg);
              break;
            case eposmsg.REQUEST.OPENDEVICE:
              self.procOpenDevice(eposmsg);
              break;
            case eposmsg.REQUEST.CLOSEDEVICE:
              self.procCloseDevice(eposmsg);
              break;
            case eposmsg.REQUEST.DEVICEDATA:
              self.procDeviceData(eposmsg);
              break;
            case eposmsg.REQUEST.SERVICEDATA:
              self.procServiceData(eposmsg);
              break;
            case eposmsg.REQUEST.OPENCOMMBOX:
              self.procOpenCommBox(eposmsg);
              break;
            case eposmsg.REQUEST.CLOSECOMMBOX:
              self.procCloseCommBox(eposmsg);
              break;
            case eposmsg.REQUEST.COMMDATA:
              self.procCommBoxData(eposmsg);
              break;
            case eposmsg.REQUEST.ERROR:
              self.procError(eposmsg);
              break;
            default:
              return;
          }
        } catch (e) {}
      });
    },
    procConnect: function (eposmsg) {
      try {
        if (this.reconnectTimerId != null) {
          clearInterval(this.reconnectTimerId);
          this.reconnectTimerId = null;
        }
        var response = null;
        var prevConnectionId = this.cookieIo.readId(
          this.conectionObj.address_p
        );
        if (eposmsg.data.protocol_version < 2) {
          response = MessageFactory.getPubkeyMessage(
            eposmsg.data.prime,
            eposmsg.data.key
          );
          this.conectionObj.emit(response);
        } else {
          if (this.connectionId != null) {
            response = MessageFactory.getReconnectMessage(
              this.connectionId,
              eposmsg.data.client_id,
              this.recievedDataId
            );
            this.conectionObj.emit(response);
          } else {
            if (prevConnectionId != "") {
              response = MessageFactory.getDisconnectMessage(prevConnectionId);
              this.conectionObj.emit(response);
              response = MessageFactory.getPubkeyMessage(
                eposmsg.data.prime,
                eposmsg.data.key
              );
              this.conectionObj.emit(response);
            } else {
              response = MessageFactory.getPubkeyMessage(
                eposmsg.data.prime,
                eposmsg.data.key
              );
              this.conectionObj.emit(response);
            }
          }
        }
        this.cookieIo.writeId(
          eposmsg.data.client_id,
          this.conectionObj.address_p
        );
        this.connectionId = eposmsg.data.client_id;
      } catch (e) {
        this.conectionObj.registIFAccessResult(
          this.conectionObj.IF_EPOSDEVICE,
          this.conectionObj.ACCESS_ERROR
        );
        this.cleanup();
      }
    },
    procPubkey: function (eposmsg) {
      try {
        if (eposmsg.code == "SHARED_KEY_MISMATCH_ERROR") {
          var mismatchErrTime = new Date().getTime();
          var mismatchTimeout = 0;
          if (this.connectStartTime != 0) {
            mismatchTimeout = mismatchErrTime - this.connectStartTime;
            if (mismatchTimeout < this.CONNECT_TIMEOUT) {
              var self = this;
              this.gbox.stock(this.socket);
              this.connectionId = null;
              this.waitRetryConnectId = setTimeout(function () {
                self.connectBySocketIo(self.CONNECT_TIMEOUT - mismatchTimeout);
              }, 100);
            } else {
              this.conectionObj.registIFAccessResult(
                this.conectionObj.IF_EPOSDEVICE,
                this.conectionObj.ACCESS_TIMEOUT
              );
              this.cleanup();
            }
          } else {
            this.conectionObj.registIFAccessResult(
              this.conectionObj.IF_EPOSDEVICE,
              this.conectionObj.ACCESS_TIMEOUT
            );
            this.cleanup();
          }
        } else {
          if (eposmsg.code == "PARAM_ERROR") {
            this.conectionObj.registIFAccessResult(
              this.conectionObj.IF_EPOSDEVICE,
              this.conectionObj.ACCESS_ERROR
            );
            this.cleanup();
          } else {
            var response = MessageFactory.getAdminInfoMessage();
            this.conectionObj.emit(response);
          }
        }
      } catch (e) {
        this.conectionObj.registIFAccessResult(
          this.conectionObj.IF_EPOSDEVICE,
          this.conectionObj.ACCESS_ERROR
        );
        this.cleanup();
      }
    },
    procAdminInfo: function (eposmsg) {
      if (this.eposprint) {
        return;
      }
      if (eposmsg.code != this.RESULT_OK) {
        this.conectionObj.registIFAccessResult(
          this.conectionObj.IF_EPOSDEVICE,
          this.conectionObj.ACCESS_ERROR
        );
        return;
      }
      this.admin = eposmsg.data.admin_name;
      this.location = eposmsg.data.location;
      this.conectionObj.registIFAccessResult(
        this.conectionObj.IF_EPOSDEVICE,
        this.conectionObj.ACCESS_OK
      );
    },
    procReconnect: function (eposmsg) {
      if (
        this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE) !=
        this.conectionObj.RECONNECTING
      ) {
        return;
      }
      if (eposmsg.code == this.RESULT_OK) {
        this.conectionObj.changeStatus(
          this.conectionObj.IF_EPOSDEVICE,
          this.conectionObj.CONNECT
        );
        if (this.onreconnect != null) {
          this.onreconnect();
        }
      } else {
        this.cleanup();
      }
    },
    procDisconnect: function (eposmsg) {},
    procOpenDevice: function (eposmsg) {
      var deviceId = eposmsg.deviceId;
      try {
        var element = this.devObjElmMap.get(deviceId);
        if (eposmsg.code == this.RESULT_OK) {
          if (element.callback != null) {
            element.callback(element.deviceObject, eposmsg.code);
          }
        } else {
          if (element.callback != null) {
            element.callback(null, eposmsg.code);
          }
          this.devObjElmMap.remove(deviceId);
        }
      } catch (e) {
        if (this.onerror != null) {
          this.onerror("0", deviceId, this.ERROR_SYSTEM, null);
        }
      }
    },
    procCloseDevice: function (eposmsg) {
      var deviceId = eposmsg.deviceId;
      try {
        if (eposmsg.code == this.RESULT_OK) {
          var element = this.devObjElmMap.get(deviceId);
          if (element.callback != null) {
            element.callback(eposmsg.code);
          }
          try {
            element.deviceObject.finalize();
          } catch (e) {}
          this.devObjElmMap.remove(deviceId);
        }
      } catch (e) {
        if (this.onerror != null) {
          this.onerror("0", deviceId, this.ERROR_SYSTEM, null);
        }
      }
    },
    procDeviceData: function (eposmsg) {
      var deviceId = eposmsg.deviceId;
      var sequence = eposmsg.sequence;
      var data = eposmsg.data;
      try {
        var devObjElm = this.devObjElmMap.get(deviceId);
        if (devObjElm.isCrypto) {
          data = MessageFactory.decrypt(data);
        }
        var deviceObject = devObjElm.deviceObject;
        var method = "client_" + data.type;
        try {
          if (deviceObject instanceof OtherPeripheral) {
            deviceObject.client_onreceive(data, sequence);
          } else {
            eval("deviceObject." + method + "(data, sequence)");
          }
        } catch (e) {
          eval("deviceObject." + data.type + "(data, sequence)");
        }
      } catch (e) {
        if (this.onerror != null) {
          this.onerror(sequence, deviceId, this.ERROR_SYSTEM, null);
        }
      }
    },
    procServiceData: function (eposmsg) {
      try {
        switch (eposmsg.serviceId) {
          case "OFSC":
            this.ofsc.notify(eposmsg);
            break;
          default:
            break;
        }
      } catch (e) {
        if (this.onerror != null) {
          this.onerror(
            eposmsg.sequence,
            eposmsg.serviceId,
            this.ERROR_SYSTEM,
            null
          );
        }
      }
    },
    procOpenCommBox: function (eposmsg) {
      var sequence = eposmsg.sequence;
      try {
        this.commBoxManager.client_opencommbox(eposmsg.data, sequence);
      } catch (e) {
        if (this.onerror != null) {
          this.onerror(sequence, "", this.ERROR_SYSTEM, null);
        }
      }
    },
    procCloseCommBox: function (eposmsg) {
      var sequence = eposmsg.sequence;
      try {
        this.commBoxManager.client_closecommbox(eposmsg.data, sequence);
      } catch (e) {
        if (this.onerror != null) {
          this.onerror(sequence, "", this.ERROR_SYSTEM, null);
        }
      }
    },
    procCommBoxData: function (eposmsg) {
      var sequence = eposmsg.sequence;
      try {
        this.commBoxManager.executeCommDataCallback(eposmsg.data, sequence);
      } catch (e) {
        if (this.onerror != null) {
          this.onerror(sequence, "", this.ERROR_SYSTEM, null);
        }
      }
    },
    procError: function (eposmsg) {
      try {
        if (this.onerror != null) {
          this.onerror(
            eposmsg.sequence,
            eposmsg.deviceId,
            eposmsg.code,
            eposmsg.data
          );
        }
      } catch (e) {}
    },
    startReconnectAction: function () {
      if (
        this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE) ==
        this.conectionObj.RECONNECTING
      ) {
        return;
      }
      this.conectionObj.changeStatus(
        this.conectionObj.IF_EPOSDEVICE,
        this.conectionObj.RECONNECTING
      );
      this.reconnectTryCount = 0;
      var self = this;
      this.reconnectTimerId = setInterval(function () {
        if (self.socket != null) {
          self.gbox.stock(self.socket);
        }
        if (self.reconnectTryCount == self.MAX_RECONNECT_RETRY) {
          clearInterval(self.reconnectTimerId);
          self.cleanup();
          return;
        }
        if (
          self.conectionObj.status(self.conectionObj.IF_EPOSDEVICE) ==
          self.conectionObj.RECONNECTING
        ) {
          self.connectBySocketIo(self.RECONNECT_TIMEOUT);
        }
        self.reconnectTryCount++;
      }, self.RECONNECT_TIMEOUT);
      if (this.reconnectTryCount == 0 && this.onreconnecting != null) {
        this.onreconnecting();
      }
    },
    checkEposPrintService: function (deviceId, deviceType, callback) {
      this.cbCheckEposPrintService = callback;
      var self = this;
      var OK = "OK";
      var SSL_CONNECT_OK = "SSL_CONNECT_OK";
      var ERROR_TIMEOUT = "ERROR_TIMEOUT";
      var ERROR_PARAMETER = "ERROR_PARAMETER";
      var ERROR_SYSTEM = "SYSTEM_ERROR";
      var postUrl = null;
      var printUrl =
        this.conectionObj.getAddressWithProtocol() +
        "/cgi-bin/epos/service.cgi?devid=" +
        deviceId +
        "&timeout=10000";
      var displayUrl =
        this.conectionObj.getAddressWithProtocol() +
        "/cgi-bin/eposDisp/service.cgi?devid=" +
        deviceId +
        "&timeout=10000";
      var postData = null;
      var printData =
        '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"></epos-print></s:Body></s:Envelope>';
      var displayData =
        '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-display xmlns="http://www.epson-pos.com/schemas/2012/09/epos-display"></epos-display></s:Body></s:Envelope>';
      var xhr = null;
      var tid;
      var success;
      if (deviceType == this.DEVICE_TYPE_DISPLAY) {
        postUrl = displayUrl;
        postData = displayData;
      } else {
        postUrl = printUrl;
        postData = printData;
      }
      if (window.XDomainRequest) {
        try {
          xhr = new XDomainRequest();
          xhr.open("POST", postUrl);
          xhr.onload = function () {
            if (self.cbCheckEposPrintService != null) {
              if (/response/.test(xhr.responseText)) {
                success = /success\s*=\s*"\s*(1|true)\s*"/.test(
                  xhr.responseText
                );
                if (success) {
                  self.cbCheckEposPrintService(OK);
                  self.cbCheckEposPrintService = null;
                } else {
                  self.cbCheckEposPrintService(ERROR_PARAMETER);
                  self.cbCheckEposPrintService = null;
                }
              } else {
                self.cbCheckEposPrintService(ERROR_PARAMETER);
                self.cbCheckEposPrintService = null;
              }
            }
          };
          xhr.onerror = function () {
            if (self.cbCheckEposPrintService != null) {
              self.cbCheckEposPrintService(ERROR_PARAMETER);
              self.cbCheckEposPrintService = null;
            }
          };
          xhr.ontimeout = function () {
            if (self.cbCheckEposPrintService != null) {
              self.cbCheckEposPrintService(ERROR_TIMEOUT);
              self.cbCheckEposPrintService = null;
            }
          };
          xhr.onprogress = function () {};
          xhr.send(postData);
        } catch (e) {
          if (self.cbCheckEposPrintService != null) {
            self.cbCheckEposPrintService(ERROR_PARAMETER);
            self.cbCheckEposPrintService = null;
          }
        }
      } else {
        try {
          xhr = new XMLHttpRequest();
          xhr.open("POST", postUrl, true);
          xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
          xhr.setRequestHeader(
            "If-Modified-Since",
            "Thu, 01 Jun 1970 00:00:00 GMT"
          );
          xhr.setRequestHeader("SOAPAction", '""');
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              clearTimeout(tid);
              if (self.cbCheckEposPrintService != null) {
                if (xhr.status == 200 && xhr.responseXML) {
                  var res = xhr.responseXML.getElementsByTagName("response");
                  if (res.length <= 0) {
                    success = false;
                  } else {
                    success = /^(1|true)$/.test(res[0].getAttribute("success"));
                  }
                  if (success) {
                    self.cbCheckEposPrintService(OK);
                    self.cbCheckEposPrintService = null;
                  } else {
                    self.cbCheckEposPrintService(ERROR_PARAMETER);
                    self.cbCheckEposPrintService = null;
                  }
                } else {
                  self.cbCheckEposPrintService(ERROR_PARAMETER);
                  self.cbCheckEposPrintService = null;
                }
              }
            }
          };
          tid = setTimeout(function () {
            xhr.abort();
            if (self.cbCheckEposPrintService != null) {
              self.cbCheckEposPrintService(ERROR_TIMEOUT);
              self.cbCheckEposPrintService = null;
            }
          }, 5000);
          xhr.timeout = 10000;
          xhr.send(postData);
        } catch (e) {
          if (self.cbCheckEposPrintService != null) {
            self.cbCheckEposPrintService(ERROR_PARAMETER);
            self.cbCheckEposPrintService = null;
          }
        }
      }
    },
  };
  function SocketGarbageBox() {
    this.box = new Array();
  }
  SocketGarbageBox.prototype = {
    stock: function (socket) {
      if (socket == null) {
        return;
      }
      socket.removeAllListeners("connect");
      socket.removeAllListeners("close");
      socket.removeAllListeners("disconnect");
      socket.removeAllListeners("error");
      socket.removeAllListeners("connect_failed");
      socket.removeAllListeners("message");
      var clone = function () {};
      clone.prototype = socket;
      this.box.push(clone);
    },
    dispose: function () {
      while (0 < this.box.length) {
        var socket = this.box.pop();
        try {
          socket.disconnect();
          delete socket;
        } catch (e) {}
      }
    },
  };
  function Connection() {
    this.OK = "OK";
    this.SSL_CONNECT_OK = "SSL_CONNECT_OK";
    this.ERROR_TIMEOUT = "ERROR_TIMEOUT";
    this.ERROR_PARAMETER = "ERROR_PARAMETER";
    this.ERROR_SYSTEM = "SYSTEM_ERROR";
    this.socket_p = null;
    this.address_p = "";
    this.protocol_p = "";
    this.port_p = "";
    this.callback_p = null;
    this.usableIF_p = 0;
    this.ws_status_p = 2;
    this.dev_status_p = 2;
    this.IF_EPOSDEVICE = 1;
    this.IF_EPOSPRINT = 2;
    this.IF_EPOSDISPLAY = 4;
    this.IF_ALL = 7;
    this.ACCESS_OK = "OK";
    this.ACCESS_ERROR = "ERROR";
    this.ACCESS_TIMEOUT = "TIMEOUT";
    this.ACCESS_NONE = "NONE";
    this.CONNECT = 1;
    this.DISCONNECT = 2;
    this.RECONNECTING = 4;
  }
  Connection.prototype.probe = function (url, postdata, callback) {
    var probeSelf = this;
    var xhr = null;
    var tid;
    if (window.XDomainRequest) {
      try {
        xhr = new XDomainRequest();
        xhr.open("POST", url);
        xhr.onload = function () {
          callback(probeSelf.OK);
        };
        xhr.onerror = function () {
          callback(probeSelf.ERROR_PARAMETER);
        };
        xhr.ontimeout = function () {
          callback(probeSelf.ERROR_TIMEOUT);
        };
        xhr.onprogress = function () {};
        xhr.send(postdata);
      } catch (e) {
        callback(this.ERROR_PARAMETER);
      }
    } else {
      try {
        xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
        xhr.setRequestHeader(
          "If-Modified-Since",
          "Thu, 01 Jun 1970 00:00:00 GMT"
        );
        xhr.setRequestHeader("SOAPAction", '""');
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            clearTimeout(tid);
            if (xhr.status == 200) {
              callback(probeSelf.OK);
            } else {
              callback(probeSelf.ERROR_PARAMETER);
            }
          }
        };
        tid = setTimeout(function () {
          xhr.abort();
          callback(probeSelf.ERROR_TIMEOUT);
        }, 5000);
        xhr.timeout = 10000;
        xhr.send(postdata);
      } catch (e) {
        callback(this.ERROR_PARAMETER);
      }
    }
  };
  Connection.prototype.probeWebServiceIF = function (callback) {
    var startTime = new Date().getTime();
    var isPrintReceive = false;
    var isDisplayReceive = false;
    var isNotified = false;
    var probeSelf = this;
    var printUrl =
      this.getAddressWithProtocol() +
      "/cgi-bin/epos/service.cgi?devid=local_printer&timeout=10000";
    var printData =
      '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"></epos-print></s:Body></s:Envelope>';
    this.probe(printUrl, printData, function (code) {
      var result = probeSelf.ACCESS_ERROR;
      if (code == probeSelf.OK) {
        result = probeSelf.ACCESS_OK;
      }
      probeSelf.registIFAccessResult(probeSelf.IF_EPOSPRINT, result);
      isPrintReceive = true;
      if (isPrintReceive && isDisplayReceive) {
        if (!isNotified) {
          isNotified = true;
          callback(new Date().getTime() - startTime);
        }
      }
    });
    var displayUrl =
      this.getAddressWithProtocol() +
      "/cgi-bin/eposDisp/service.cgi?devid=local_display&timeout=10000";
    var displayData =
      '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-display xmlns="http://www.epson-pos.com/schemas/2012/09/epos-display"></epos-display></s:Body></s:Envelope>';
    this.probe(displayUrl, displayData, function (code) {
      var result = probeSelf.ACCESS_ERROR;
      if (code == probeSelf.OK) {
        result = probeSelf.ACCESS_OK;
      }
      probeSelf.registIFAccessResult(probeSelf.IF_EPOSDISPLAY, result);
      isDisplayReceive = true;
      if (isPrintReceive && isDisplayReceive) {
        if (!isNotified) {
          isNotified = true;
          callback(new Date().getTime() - startTime);
        }
      }
    });
  };
  Connection.prototype.setSocket = function (socket) {
    this.socket_p = socket;
  };
  Connection.prototype.emit = function (eposmsg) {
    try {
      if (this.socket_p == null) {
        return;
      }
      this.socket_p.emit("message", eposmsg.toTransmissionForm());
    } catch (e) {
      throw new Error(this.ERROR_SYSTEM);
    }
  };
  Connection.prototype.setAddress = function (protocol, address, port) {
    this.protocol_p = protocol;
    this.address_p = address;
    this.port_p = port;
    this.usableIF_p = 0;
  };
  Connection.prototype.getAddressWithProtocol = function () {
    return this.protocol_p + "://" + this.address_p;
  };
  Connection.prototype.getSocketIoURL = function () {
    return this.getAddressWithProtocol() + ":" + this.port_p;
  };
  Connection.prototype.registCallback = function (callback) {
    if (typeof callback == "function") {
      this.callback_p = callback;
    }
  };
  Connection.prototype.changeStatus = function (target, status) {
    switch (target) {
      case this.IF_ALL:
        this.dev_status_p = status;
        this.ws_status_p = status;
        break;
      case this.IF_EPOSDEVICE:
        this.dev_status_p = status;
        break;
      default:
        this.ws_status_p = status;
        break;
    }
  };
  Connection.prototype.status = function (target) {
    if (target == this.IF_EPOSDEVICE) {
      return this.dev_status_p;
    } else {
      return this.ws_status_p;
    }
  };
  Connection.prototype.isUsableDeviceIF = function () {
    return (this.usableIF_p & this.IF_EPOSDEVICE) == this.IF_EPOSDEVICE;
  };
  Connection.prototype.isUsablePrintIF = function () {
    if (this.isUsableDeviceIF()) {
      return true;
    }
    return (this.usableIF_p & this.IF_EPOSPRINT) == this.IF_EPOSPRINT;
  };
  Connection.prototype.isUsableDisplayIF = function () {
    if (this.isUsableDeviceIF()) {
      return true;
    }
    return (this.usableIF_p & this.IF_EPOSDISPLAY) == this.IF_EPOSDISPLAY;
  };
  Connection.prototype.registIFAccessResult = function (type, code) {
    if (code == this.ACCESS_OK) {
      this.changeStatus(type, this.CONNECT);
      this.usableIF_p |= type;
    }
    if (type == this.IF_EPOSDEVICE) {
      var result = this.ERROR_PARAMETER;
      if (this.usableIF_p & this.IF_ALL) {
        if (this.protocol_p == "http") {
          result = this.OK;
        } else {
          result = this.SSL_CONNECT_OK;
        }
      }
      if (code == this.ACCESS_TIMEOUT) {
        result = this.ERROR_TIMEOUT;
      }
      if (this.callback_p != null) {
        try {
          this.callback_p(result);
        } catch (e) {}
        this.callback_p = null;
      }
    }
  };
  function ePosCrypto() {
    this.pubkey_c = "";
    this.secretKey = "";
  }
  ePosCrypto.prototype = {
    genClientKeys: function (arg_prime_s, arg_pubkey_s) {
      var g = str2bigInt("2", 10);
      var prime_c = str2bigInt(arg_prime_s, 16);
      var privkey_c = randBigInt(64, 0);
      this.pubkey_c = powMod(g, privkey_c, prime_c);
      var intPubkey = str2bigInt(arg_pubkey_s, 16);
      var modNum = powMod(intPubkey, privkey_c, prime_c);
      var strModNum = bigInt2str(modNum, 16);
      var strSecretKey = strModNum.toLowerCase();
      while (strSecretKey.length < 192) {
        strSecretKey = "0" + strSecretKey;
      }
      this.secretKey = md5.bin(strSecretKey);
    },
    bfEncrypt: function (data) {
      try {
        var enc_req = {
          data: data,
          key: this.secretKey,
          mode: "cbc",
          round: 16,
          iv: blowfish.mkIV(),
        };
        var enc_data = blowfish.encrypt(enc_req);
        var cdata = base64.encode(enc_data);
      } catch (e) {
        return "";
      }
      return cdata;
    },
    bfDecrypt: function (data) {
      try {
        var dec_req = {
          data: base64.decode(data),
          key: this.secretKey,
          mode: "cbc",
        };
        var ddata = blowfish.decrypt(dec_req);
      } catch (e) {
        return "";
      }
      return ddata;
    },
  };
  function ePosDeviceMessage() {
    this.REQUEST = {
      CONNECT: "connect",
      PUBKEY: "pubkey",
      ADMININFO: "admin_info",
      RECONNECT: "reconnect",
      DISCONNECT: "disconnect",
      OPENDEVICE: "open_device",
      CLOSEDEVICE: "close_device",
      DEVICEDATA: "device_data",
      SERVICEDATA: "service_data",
      ERROR: "error",
      OPENCOMMBOX: "open_commbox",
      CLOSECOMMBOX: "close_commbox",
      COMMDATA: "commbox_data",
    };
    this.request = null;
    this.sequence = 0;
    this.deviceId = "";
    this.serviceId = "";
    this.data = {};
    this.isCrypto = "0";
    this.code = "";
    this.data_id = 0;
  }
  ePosDeviceMessage.prototype = {
    toTransmissionForm: function () {
      var message = null;
      switch (this.request) {
        case this.REQUEST.PUBKEY:
        case this.REQUEST.ADMININFO:
        case this.REQUEST.RECONNECT:
        case this.REQUEST.DISCONNECT:
          message = [this.request, this.data];
          break;
        case this.REQUEST.OPENDEVICE:
        case this.REQUEST.CLOSEDEVICE:
          message = [this.request, this.deviceId, this.data, this.data_id];
          break;
        case this.REQUEST.DEVICEDATA:
          message = [
            this.request,
            this.sequence,
            this.deviceId,
            this.data,
            this.data_id,
          ];
          break;
        case this.REQUEST.SERVICEDATA:
          message = [
            this.request,
            this.sequence,
            this.serviceId,
            this.isCrypto,
            this.data,
            this.data_id,
          ];
          break;
        case this.REQUEST.OPENCOMMBOX:
        case this.REQUEST.CLOSECOMMBOX:
        case this.REQUEST.COMMDATA:
          message = [this.request, this.sequence, this.data, this.data_id];
          break;
        default:
          message = null;
      }
      return message;
    },
  };
  var MessageFactory = (function () {
    var PUBKEY_TEST_TEXT = "hello";
    var sequence = 0;
    var cipher = new ePosCrypto();
    getNextSequence = function () {
      sequence++;
      if (Number.MAX_VALUE == sequence) {
        sequence = 1;
      }
      return String(sequence);
    };
    return {
      parseRequestMessage: function (message) {
        var eposmsg = new ePosDeviceMessage();
        eposmsg.request = message[0];
        switch (eposmsg.request) {
          case eposmsg.REQUEST.CONNECT:
            eposmsg.data = message[1];
            break;
          case eposmsg.REQUEST.PUBKEY:
          case eposmsg.REQUEST.ADMININFO:
          case eposmsg.REQUEST.RECONNECT:
          case eposmsg.REQUEST.DISCONNECT:
            eposmsg.code = message[1];
            eposmsg.data = message[2];
            break;
          case eposmsg.REQUEST.OPENDEVICE:
          case eposmsg.REQUEST.CLOSEDEVICE:
            eposmsg.deviceId = message[1];
            eposmsg.code = message[2];
            eposmsg.data = message[3];
            eposmsg.data_id = message[4];
            break;
          case eposmsg.REQUEST.DEVICEDATA:
            eposmsg.sequence = message[1];
            eposmsg.deviceId = message[2];
            eposmsg.data = message[3];
            eposmsg.data_id = message[4];
            break;
          case eposmsg.REQUEST.SERVICEDATA:
            eposmsg.sequence = message[1];
            eposmsg.serviceId = message[2];
            eposmsg.isCrypto = message[3];
            eposmsg.data = message[4];
            eposmsg.data_id = message[5];
            break;
          case eposmsg.REQUEST.OPENCOMMBOX:
          case eposmsg.REQUEST.CLOSECOMMBOX:
          case eposmsg.REQUEST.COMMDATA:
            eposmsg.sequence = message[1];
            eposmsg.data = message[2];
            eposmsg.data_id = message[3];
            break;
          case eposmsg.REQUEST.ERROR:
            eposmsg.sequence = message[1];
            eposmsg.deviceId = message[2];
            eposmsg.code = message[3];
            eposmsg.data = message[4];
            eposmsg.data_id = message[5];
            break;
          default:
            eposmsg = null;
        }
        return eposmsg;
      },
      getPubkeyMessage: function (prime, key) {
        var eposmsg = new ePosDeviceMessage();
        eposmsg.request = eposmsg.REQUEST.PUBKEY;
        cipher.genClientKeys(prime, key);
        var testData = cipher.bfEncrypt(PUBKEY_TEST_TEXT);
        var pubkey = bigInt2str(cipher.pubkey_c, 16);
        while (pubkey.length < 192) {
          pubkey = "0" + pubkey;
        }
        eposmsg.data = { key: pubkey, testData: testData };
        return eposmsg;
      },
      getAdminInfoMessage: function () {
        var eposmsg = new ePosDeviceMessage();
        eposmsg.request = eposmsg.REQUEST.ADMININFO;
        eposmsg.data = {};
        return eposmsg;
      },
      getReconnectMessage: function (prevId, curId, dataId) {
        var eposmsg = new ePosDeviceMessage();
        eposmsg.request = eposmsg.REQUEST.RECONNECT;
        eposmsg.data = {
          old_client_id: prevId,
          new_client_id: curId,
          received_id: dataId,
        };
        return eposmsg;
      },
      getDisconnectMessage: function (connectionId) {
        var eposmsg = new ePosDeviceMessage();
        eposmsg.request = eposmsg.REQUEST.DISCONNECT;
        eposmsg.data = { client_id: connectionId };
        return eposmsg;
      },
      getOpenDeviceMessage: function (
        deviceId,
        deviceType,
        isCrypto,
        isBufferEnable
      ) {
        var eposmsg = new ePosDeviceMessage();
        var deviceTypeName = deviceType;
        if (deviceTypeName == "type_hybrid_printer2") {
          deviceTypeName = "type_hybrid_printer";
        }
        eposmsg.request = eposmsg.REQUEST.OPENDEVICE;
        eposmsg.deviceId = deviceId;
        eposmsg.data = {
          type: deviceTypeName,
          crypto: isCrypto,
          buffer: isBufferEnable,
        };
        return eposmsg;
      },
      getCloseDeviceMessage: function (deviceId) {
        var eposmsg = new ePosDeviceMessage();
        eposmsg.request = eposmsg.REQUEST.CLOSEDEVICE;
        eposmsg.deviceId = deviceId;
        eposmsg.data = {};
        return eposmsg;
      },
      getDeviceDataMessage: function (deviceId, data, crypto) {
        var eposmsg = new ePosDeviceMessage();
        eposmsg.request = eposmsg.REQUEST.DEVICEDATA;
        eposmsg.sequence = getNextSequence();
        eposmsg.deviceId = deviceId;
        if (crypto) {
          eposmsg.data = cipher.bfEncrypt(JSON.stringify(data));
        } else {
          eposmsg.data = data;
        }
        return eposmsg;
      },
      getServiceMessage: function (serviceId, isCrypt, data) {
        var eposmsg = new ePosDeviceMessage();
        eposmsg.request = eposmsg.REQUEST.SERVICEDATA;
        eposmsg.sequence = getNextSequence();
        eposmsg.serviceId = serviceId;
        eposmsg.isCrypto = isCrypt;
        if (isCrypt) {
          eposmsg.data = cipher.bfEncrypt(JSON.stringify(data));
        } else {
          eposmsg.data = data;
        }
        return eposmsg;
      },
      getOpenCommBoxMessage: function (data) {
        var eposmsg = new ePosDeviceMessage();
        eposmsg.request = eposmsg.REQUEST.OPENCOMMBOX;
        eposmsg.sequence = getNextSequence();
        eposmsg.data = data;
        return eposmsg;
      },
      getCloseCommBoxMessage: function (data) {
        var eposmsg = new ePosDeviceMessage();
        eposmsg.request = eposmsg.REQUEST.CLOSECOMMBOX;
        eposmsg.sequence = getNextSequence();
        eposmsg.data = data;
        return eposmsg;
      },
      getCommBoxDataMessage: function (data) {
        var eposmsg = new ePosDeviceMessage();
        eposmsg.request = eposmsg.REQUEST.COMMDATA;
        eposmsg.sequence = getNextSequence();
        eposmsg.data = data;
        return eposmsg;
      },
      decrypt: function (data) {
        var decryptoData = cipher.bfDecrypt(data);
        return JSON.parse(decryptoData);
      },
    };
  })();
  function ePOSDeviceConfiguration(address) {
    this.DEVICE_GROUP_ALL = "group_all";
    this.DEVICE_GROUP_PRINTER = "group_printer";
    this.DEVICE_GROUP_DISPLAY = "group_display";
    this.DEVICE_GROUP_HID = "group_hid";
    this.DEVICE_GROUP_SERIAL = "group_serial";
    this.DEVICE_GROUP_OTHER = "group_other";
    this.DEVICE_TYPE_PRINTER = "type_printer";
    this.DEVICE_TYPE_HYBRID_PRINTER = "type_hybrid_printer";
    this.DEVICE_TYPE_DISPLAY = "type_display";
    this.DEVICE_TYPE_KEYBOARD = "type_keyboard";
    this.DEVICE_TYPE_SCANNER = "type_scanner";
    this.DEVICE_TYPE_MSR = "type_msr";
    this.DEVICE_TYPE_CASH_CHANGER = "type_cash_changer";
    this.DEVICE_TYPE_SIMPLE_SERIAL = "type_simple_serial";
    this.DEVICE_TYPE_CASH_DRAWER = "type_cash_drawer";
    this.DEVICE_TYPE_PIN_PAD = "type_pin_pad";
    this.DEVICE_TYPE_CAT = "type_cat";
    this.DEVICE_TYPE_SMARTCARD_RW = "type_smartcard_rw";
    this.CGI_PATH = "/epson_eposdevice/getDeviceList.cgi";
    this.RESULT_OK = "OK";
    this.UNKNOWN = "unknown";
    this.ONLINE = "online";
    this.OFFLINE = "offline";
    this.INTERVAL = 500;
    this.TIMEOUT = 60 * 1000;
    this.address = address;
    this.cb = null;
    this.message = null;
    this.WEBSOCKET_PORT = 8008;
    this.SSLWEBSOCKET_PORT = 8043;
  }
  ePOSDeviceConfiguration.prototype.getRegisterdDevices = function (
    type,
    callback
  ) {
    this.cb = callback;
    var self = this;
    var xhr = null;
    var protocol = window.location.protocol + "//";
    var param = "?group=" + type;
    var url = protocol + this.address + this.CGI_PATH + param;
    if (window.XDomainRequest) {
      xhr = new XDomainRequest();
      xhr.open("GET", url);
      xhr.onload = function () {
        self.message = self.RESULT_OK;
        var jsonObj = JSON.parse(xhr.responseText);
        self.checkDevice(jsonObj, function (resultList) {
          for (var key in resultList) {
            for (var i = 0; i < jsonObj.length; i++) {
              if (jsonObj[i].deviceId != key) {
                continue;
              }
              jsonObj[i].status = resultList[key];
            }
          }
          if (self.cb != null) {
            self.cb(self, jsonObj);
            self.cb = null;
          }
        });
      };
      xhr.onerror = function () {
        self.message = "Failed to get device list.";
        if (self.cb != null) {
          self.cb(self, null);
          self.cb = null;
        }
      };
    } else {
      xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Pragma", "no-cache");
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.setRequestHeader(
        "If-Modified-Since",
        "Thu, 01 Jun 1970 00:00:00 GMT"
      );
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            self.message = self.RESULT_OK;
            var jsonObj = JSON.parse(xhr.responseText);
            self.checkDevice(jsonObj, function (resultList) {
              for (var key in resultList) {
                for (var i = 0; i < jsonObj.length; i++) {
                  if (jsonObj[i].deviceId != key) {
                    continue;
                  }
                  jsonObj[i].status = resultList[key];
                }
              }
              if (self.cb != null) {
                self.cb(self, jsonObj);
                self.cb = null;
              }
            });
          } else {
            self.message = "Failed to get device list.";
            if (self.cb != null) {
              self.cb(self, null);
              self.cb = null;
            }
          }
        }
      };
    }
    xhr.send(null);
  };
  ePOSDeviceConfiguration.prototype.checkDevice = function (obj, callback) {
    var self = this;
    var protocol = window.location.protocol;
    var port = protocol.match(/^(https:)/)
      ? this.SSLWEBSOCKET_PORT
      : this.WEBSOCKET_PORT;
    var ePosDev = new epson.ePOSDevice();
    var resultList = new Array();
    for (var i = 0; i < obj.length; i++) {
      resultList[obj[i].deviceId] = self.UNKNOWN;
    }
    ePosDev.onerror = function (sq, deviceId, result) {
      if (deviceId != "") {
        resultList[deviceId] = self.OFFLINE;
      }
    };
    ePosDev.connect(this.address, port, function (data) {
      if (data == "OK" || data == "SSL_CONNECT_OK") {
        for (var i = 0; i < obj.length; i++) {
          ePosDev.createDevice(
            obj[i].deviceId,
            obj[i].deviceType,
            {},
            function (data, code) {
              resultList[data.deviceID] =
                code == "OK" ? self.ONLINE : self.OFFLINE;
              ePosDev.deleteDevice(data, null);
            }
          );
        }
      }
    });
    var timer;
    timer = window.setInterval(function () {
      for (var key in resultList) {
        if (resultList[key] == self.UNKNOWN) {
          return;
        }
      }
      clearInterval(timer);
      if (callback != null) {
        callback(resultList);
      }
    }, self.INTERVAL);
    window.setTimeout(function () {
      clearInterval(timer);
      if (callback != null) {
        callback(resultList);
      }
    }, self.TIMEOUT);
  };
  if (typeof JSON !== "object") {
    JSON = {};
  }
  (function () {
    function f(n) {
      return n < 10 ? "0" + n : n;
    }
    if (typeof Date.prototype.toJSON !== "function") {
      Date.prototype.toJSON = function (key) {
        return isFinite(this.valueOf())
          ? this.getUTCFullYear() +
              "-" +
              f(this.getUTCMonth() + 1) +
              "-" +
              f(this.getUTCDate()) +
              "T" +
              f(this.getUTCHours()) +
              ":" +
              f(this.getUTCMinutes()) +
              ":" +
              f(this.getUTCSeconds()) +
              "Z"
          : null;
      };
      String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON =
          function (key) {
            return this.valueOf();
          };
    }
    var cx =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable =
        /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      },
      rep;
    function quote(string) {
      escapable.lastIndex = 0;
      return escapable.test(string)
        ? '"' +
            string.replace(escapable, function (a) {
              var c = meta[a];
              return typeof c === "string"
                ? c
                : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
        : '"' + string + '"';
    }
    function str(key, holder) {
      var i,
        k,
        v,
        length,
        mind = gap,
        partial,
        value = holder[key];
      if (
        value &&
        typeof value === "object" &&
        typeof value.toJSON === "function"
      ) {
        value = value.toJSON(key);
      }
      if (typeof rep === "function") {
        value = rep.call(holder, key, value);
      }
      switch (typeof value) {
        case "string":
          return quote(value);
        case "number":
          return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
          return String(value);
        case "object":
          if (!value) {
            return "null";
          }
          gap += indent;
          partial = [];
          if (Object.prototype.toString.apply(value) === "[object Array]") {
            length = value.length;
            for (i = 0; i < length; i += 1) {
              partial[i] = str(i, value) || "null";
            }
            v =
              partial.length === 0
                ? "[]"
                : gap
                ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                : "[" + partial.join(",") + "]";
            gap = mind;
            return v;
          }
          if (rep && typeof rep === "object") {
            length = rep.length;
            for (i = 0; i < length; i += 1) {
              if (typeof rep[i] === "string") {
                k = rep[i];
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (gap ? ": " : ":") + v);
                }
              }
            }
          } else {
            for (k in value) {
              if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (gap ? ": " : ":") + v);
                }
              }
            }
          }
          v =
            partial.length === 0
              ? "{}"
              : gap
              ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
              : "{" + partial.join(",") + "}";
          gap = mind;
          return v;
      }
    }
    if (typeof JSON.stringify !== "function") {
      JSON.stringify = function (value, replacer, space) {
        var i;
        gap = "";
        indent = "";
        if (typeof space === "number") {
          for (i = 0; i < space; i += 1) {
            indent += " ";
          }
        } else {
          if (typeof space === "string") {
            indent = space;
          }
        }
        rep = replacer;
        if (
          replacer &&
          typeof replacer !== "function" &&
          (typeof replacer !== "object" || typeof replacer.length !== "number")
        ) {
          throw new Error("JSON.stringify");
        }
        return str("", { "": value });
      };
    }
    if (typeof JSON.parse !== "function") {
      JSON.parse = function (text, reviver) {
        var j;
        function walk(holder, key) {
          var k,
            v,
            value = holder[key];
          if (value && typeof value === "object") {
            for (k in value) {
              if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = walk(value, k);
                if (v !== undefined) {
                  value[k] = v;
                } else {
                  delete value[k];
                }
              }
            }
          }
          return reviver.call(holder, key, value);
        }
        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
          text = text.replace(cx, function (a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
          });
        }
        if (
          /^[\],:{}\s]*$/.test(
            text
              .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
              .replace(
                /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                "]"
              )
              .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
          )
        ) {
          j = eval("(" + text + ")");
          return typeof reviver === "function" ? walk({ "": j }, "") : j;
        }
        throw new SyntaxError("JSON.parse");
      };
    }
  })();
  /*! Socket.IO.js build:0.8.7, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */
  (function (exports, global) {
    var io = exports;
    io.version = "0.8.7";
    io.protocol = 1;
    io.transports = [];
    io.j = [];
    io.sockets = {};
    io.connect = function (host, details) {
      var uri = io.util.parseUri(host),
        uuri,
        socket;
      if (global && global.location) {
        uri.protocol = uri.protocol || global.location.protocol.slice(0, -1);
        uri.host =
          uri.host ||
          (global.document ? global.document.domain : global.location.hostname);
        uri.port = uri.port || global.location.port;
      }
      uuri = io.util.uniqueUri(uri);
      var options = {
        host: uri.host,
        secure: "https" == uri.protocol,
        port: uri.port || ("https" == uri.protocol ? 443 : 80),
        query: uri.query || "",
      };
      io.util.merge(options, details);
      if (options["force new connection"] || !io.sockets[uuri]) {
        socket = new io.Socket(options);
      }
      if (!options["force new connection"] && socket) {
        io.sockets[uuri] = socket;
      }
      socket = socket || io.sockets[uuri];
      return socket.of(uri.path.length > 1 ? uri.path : "");
    };
  })("object" === typeof module ? module.exports : (this.io = {}), this);
  (function (exports, global) {
    var util = (exports.util = {});
    var re =
      /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
    var parts = [
      "source",
      "protocol",
      "authority",
      "userInfo",
      "user",
      "password",
      "host",
      "port",
      "relative",
      "path",
      "directory",
      "file",
      "query",
      "anchor",
    ];
    util.parseUri = function (str) {
      var m = re.exec(str || ""),
        uri = {},
        i = 14;
      while (i--) {
        uri[parts[i]] = m[i] || "";
      }
      return uri;
    };
    util.uniqueUri = function (uri) {
      var protocol = uri.protocol,
        host = uri.host,
        port = uri.port;
      if ("document" in global) {
        host = host || document.domain;
        port =
          port ||
          (protocol == "https" && document.location.protocol !== "https:"
            ? 443
            : document.location.port);
      } else {
        host = host || "localhost";
        if (!port && protocol == "https") {
          port = 443;
        }
      }
      return (protocol || "http") + "://" + host + ":" + (port || 80);
    };
    util.query = function (base, addition) {
      var query = util.chunkQuery(base || ""),
        components = [];
      util.merge(query, util.chunkQuery(addition || ""));
      for (var part in query) {
        if (query.hasOwnProperty(part)) {
          components.push(part + "=" + query[part]);
        }
      }
      return components.length ? "?" + components.join("&") : "";
    };
    util.chunkQuery = function (qs) {
      var query = {},
        params = qs.split("&"),
        i = 0,
        l = params.length,
        kv;
      for (; i < l; ++i) {
        kv = params[i].split("=");
        if (kv[0]) {
          query[kv[0]] = decodeURIComponent(kv[1]);
        }
      }
      return query;
    };
    var pageLoaded = false;
    util.load = function (fn) {
      if (
        ("document" in global && document.readyState === "complete") ||
        pageLoaded
      ) {
        return fn();
      }
      util.on(global, "load", fn, false);
    };
    util.on = function (element, event, fn, capture) {
      if (element.attachEvent) {
        element.attachEvent("on" + event, fn);
      } else {
        if (element.addEventListener) {
          element.addEventListener(event, fn, capture);
        }
      }
    };
    util.request = function (xdomain) {
      if (xdomain && "undefined" != typeof XDomainRequest) {
        return new XDomainRequest();
      }
      if (
        "undefined" != typeof XMLHttpRequest &&
        (!xdomain || util.ua.hasCORS)
      ) {
        return new XMLHttpRequest();
      }
      if (!xdomain) {
        try {
          return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
      }
      return null;
    };
    if ("undefined" != typeof window) {
      util.load(function () {
        pageLoaded = true;
      });
    }
    util.defer = function (fn) {
      if (!util.ua.webkit || "undefined" != typeof importScripts) {
        return fn();
      }
      util.load(function () {
        setTimeout(fn, 100);
      });
    };
    util.merge = function merge(target, additional, deep, lastseen) {
      var seen = lastseen || [],
        depth = typeof deep == "undefined" ? 2 : deep,
        prop;
      for (prop in additional) {
        if (additional.hasOwnProperty(prop) && util.indexOf(seen, prop) < 0) {
          if (typeof target[prop] !== "object" || !depth) {
            target[prop] = additional[prop];
            seen.push(additional[prop]);
          } else {
            util.merge(target[prop], additional[prop], depth - 1, seen);
          }
        }
      }
      return target;
    };
    util.mixin = function (ctor, ctor2) {
      util.merge(ctor.prototype, ctor2.prototype);
    };
    util.inherit = function (ctor, ctor2) {
      function f() {}
      f.prototype = ctor2.prototype;
      ctor.prototype = new f();
    };
    util.isArray =
      Array.isArray ||
      function (obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      };
    util.intersect = function (arr, arr2) {
      var ret = [],
        longest = arr.length > arr2.length ? arr : arr2,
        shortest = arr.length > arr2.length ? arr2 : arr;
      for (var i = 0, l = shortest.length; i < l; i++) {
        if (~util.indexOf(longest, shortest[i])) {
          ret.push(shortest[i]);
        }
      }
      return ret;
    };
    util.indexOf = function (arr, o, i) {
      if (Array.prototype.indexOf) {
        return Array.prototype.indexOf.call(arr, o, i);
      }
      for (
        var j = arr.length, i = i < 0 ? (i + j < 0 ? 0 : i + j) : i || 0;
        i < j && arr[i] !== o;
        i++
      ) {}
      return j <= i ? -1 : i;
    };
    util.toArray = function (enu) {
      var arr = [];
      for (var i = 0, l = enu.length; i < l; i++) {
        arr.push(enu[i]);
      }
      return arr;
    };
    util.ua = {};
    util.ua.hasCORS =
      "undefined" != typeof XMLHttpRequest &&
      (function () {
        try {
          var a = new XMLHttpRequest();
        } catch (e) {
          return false;
        }
        return a.withCredentials != undefined;
      })();
    util.ua.webkit =
      "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent);
  })("undefined" != typeof io ? io : module.exports, this);
  (function (exports, io) {
    exports.EventEmitter = EventEmitter;
    function EventEmitter() {}
    EventEmitter.prototype.on = function (name, fn) {
      if (!this.$events) {
        this.$events = {};
      }
      if (!this.$events[name]) {
        this.$events[name] = fn;
      } else {
        if (io.util.isArray(this.$events[name])) {
          this.$events[name].push(fn);
        } else {
          this.$events[name] = [this.$events[name], fn];
        }
      }
      return this;
    };
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prototype.once = function (name, fn) {
      var self = this;
      function on() {
        self.removeListener(name, on);
        fn.apply(this, arguments);
      }
      on.listener = fn;
      this.on(name, on);
      return this;
    };
    EventEmitter.prototype.removeListener = function (name, fn) {
      if (this.$events && this.$events[name]) {
        var list = this.$events[name];
        if (io.util.isArray(list)) {
          var pos = -1;
          for (var i = 0, l = list.length; i < l; i++) {
            if (
              list[i] === fn ||
              (list[i].listener && list[i].listener === fn)
            ) {
              pos = i;
              break;
            }
          }
          if (pos < 0) {
            return this;
          }
          list.splice(pos, 1);
          if (!list.length) {
            delete this.$events[name];
          }
        } else {
          if (list === fn || (list.listener && list.listener === fn)) {
            delete this.$events[name];
          }
        }
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function (name) {
      if (this.$events && this.$events[name]) {
        this.$events[name] = null;
      }
      return this;
    };
    EventEmitter.prototype.listeners = function (name) {
      if (!this.$events) {
        this.$events = {};
      }
      if (!this.$events[name]) {
        this.$events[name] = [];
      }
      if (!io.util.isArray(this.$events[name])) {
        this.$events[name] = [this.$events[name]];
      }
      return this.$events[name];
    };
    EventEmitter.prototype.emit = function (name) {
      if (!this.$events) {
        return false;
      }
      var handler = this.$events[name];
      if (!handler) {
        return false;
      }
      var args = Array.prototype.slice.call(arguments, 1);
      if ("function" == typeof handler) {
        handler.apply(this, args);
      } else {
        if (io.util.isArray(handler)) {
          var listeners = handler.slice();
          for (var i = 0, l = listeners.length; i < l; i++) {
            listeners[i].apply(this, args);
          }
        } else {
          return false;
        }
      }
      return true;
    };
  })(
    "undefined" != typeof io ? io : module.exports,
    "undefined" != typeof io ? io : module.parent.exports
  );
  (function (exports, nativeJSON) {
    if (nativeJSON && nativeJSON.parse) {
      return (exports.JSON = {
        parse: nativeJSON.parse,
        stringify: nativeJSON.stringify,
      });
    }
    var JSON = (exports.JSON = {});
    function f(n) {
      return n < 10 ? "0" + n : n;
    }
    function date(d, key) {
      return isFinite(d.valueOf())
        ? d.getUTCFullYear() +
            "-" +
            f(d.getUTCMonth() + 1) +
            "-" +
            f(d.getUTCDate()) +
            "T" +
            f(d.getUTCHours()) +
            ":" +
            f(d.getUTCMinutes()) +
            ":" +
            f(d.getUTCSeconds()) +
            "Z"
        : null;
    }
    var cx =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable =
        /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      },
      rep;
    function quote(string) {
      escapable.lastIndex = 0;
      return escapable.test(string)
        ? '"' +
            string.replace(escapable, function (a) {
              var c = meta[a];
              return typeof c === "string"
                ? c
                : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
        : '"' + string + '"';
    }
    function str(key, holder) {
      var i,
        k,
        v,
        length,
        mind = gap,
        partial,
        value = holder[key];
      if (value instanceof Date) {
        value = date(key);
      }
      if (typeof rep === "function") {
        value = rep.call(holder, key, value);
      }
      switch (typeof value) {
        case "string":
          return quote(value);
        case "number":
          return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
          return String(value);
        case "object":
          if (!value) {
            return "null";
          }
          gap += indent;
          partial = [];
          if (Object.prototype.toString.apply(value) === "[object Array]") {
            length = value.length;
            for (i = 0; i < length; i += 1) {
              partial[i] = str(i, value) || "null";
            }
            v =
              partial.length === 0
                ? "[]"
                : gap
                ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                : "[" + partial.join(",") + "]";
            gap = mind;
            return v;
          }
          if (rep && typeof rep === "object") {
            length = rep.length;
            for (i = 0; i < length; i += 1) {
              if (typeof rep[i] === "string") {
                k = rep[i];
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (gap ? ": " : ":") + v);
                }
              }
            }
          } else {
            for (k in value) {
              if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (gap ? ": " : ":") + v);
                }
              }
            }
          }
          v =
            partial.length === 0
              ? "{}"
              : gap
              ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
              : "{" + partial.join(",") + "}";
          gap = mind;
          return v;
      }
    }
    JSON.stringify = function (value, replacer, space) {
      var i;
      gap = "";
      indent = "";
      if (typeof space === "number") {
        for (i = 0; i < space; i += 1) {
          indent += " ";
        }
      } else {
        if (typeof space === "string") {
          indent = space;
        }
      }
      rep = replacer;
      if (
        replacer &&
        typeof replacer !== "function" &&
        (typeof replacer !== "object" || typeof replacer.length !== "number")
      ) {
        throw new Error("JSON.stringify");
      }
      return str("", { "": value });
    };
    JSON.parse = function (text, reviver) {
      var j;
      function walk(holder, key) {
        var k,
          v,
          value = holder[key];
        if (value && typeof value === "object") {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }
        return reviver.call(holder, key, value);
      }
      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
        text = text.replace(cx, function (a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }
      if (
        /^[\],:{}\s]*$/.test(
          text
            .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              "]"
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
        )
      ) {
        j = eval("(" + text + ")");
        return typeof reviver === "function" ? walk({ "": j }, "") : j;
      }
      throw new SyntaxError("JSON.parse");
    };
  })(
    "undefined" != typeof io ? io : module.exports,
    typeof JSON !== "undefined" ? JSON : undefined
  );
  (function (exports, io) {
    var parser = (exports.parser = {});
    var packets = (parser.packets = [
      "disconnect",
      "connect",
      "heartbeat",
      "message",
      "json",
      "event",
      "ack",
      "error",
      "noop",
    ]);
    var reasons = (parser.reasons = [
      "transport not supported",
      "client not handshaken",
      "unauthorized",
    ]);
    var advice = (parser.advice = ["reconnect"]);
    var JSON = io.JSON,
      indexOf = io.util.indexOf;
    parser.encodePacket = function (packet) {
      var type = indexOf(packets, packet.type),
        id = packet.id || "",
        endpoint = packet.endpoint || "",
        ack = packet.ack,
        data = null;
      switch (packet.type) {
        case "error":
          var reason = packet.reason ? indexOf(reasons, packet.reason) : "",
            adv = packet.advice ? indexOf(advice, packet.advice) : "";
          if (reason !== "" || adv !== "") {
            data = reason + (adv !== "" ? "+" + adv : "");
          }
          break;
        case "message":
          if (packet.data !== "") {
            data = packet.data;
          }
          break;
        case "event":
          var ev = { name: packet.name };
          if (packet.args && packet.args.length) {
            ev.args = packet.args;
          }
          data = JSON.stringify(ev);
          break;
        case "json":
          data = JSON.stringify(packet.data);
          break;
        case "connect":
          if (packet.qs) {
            data = packet.qs;
          }
          break;
        case "ack":
          data =
            packet.ackId +
            (packet.args && packet.args.length
              ? "+" + JSON.stringify(packet.args)
              : "");
          break;
      }
      var encoded = [type, id + (ack == "data" ? "+" : ""), endpoint];
      if (data !== null && data !== undefined) {
        encoded.push(data);
      }
      return encoded.join(":");
    };
    parser.encodePayload = function (packets) {
      var decoded = "";
      if (packets.length == 1) {
        return packets[0];
      }
      for (var i = 0, l = packets.length; i < l; i++) {
        var packet = packets[i];
        decoded += "\ufffd" + packet.length + "\ufffd" + packets[i];
      }
      return decoded;
    };
    var regexp = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
    parser.decodePacket = function (data) {
      var pieces = data.match(regexp);
      if (!pieces) {
        return {};
      }
      var id = pieces[2] || "",
        data = pieces[5] || "",
        packet = { type: packets[pieces[1]], endpoint: pieces[4] || "" };
      if (id) {
        packet.id = id;
        if (pieces[3]) {
          packet.ack = "data";
        } else {
          packet.ack = true;
        }
      }
      switch (packet.type) {
        case "error":
          var pieces = data.split("+");
          packet.reason = reasons[pieces[0]] || "";
          packet.advice = advice[pieces[1]] || "";
          break;
        case "message":
          packet.data = data || "";
          break;
        case "event":
          try {
            var opts = JSON.parse(data);
            packet.name = opts.name;
            packet.args = opts.args;
          } catch (e) {}
          packet.args = packet.args || [];
          break;
        case "json":
          try {
            packet.data = JSON.parse(data);
          } catch (e) {}
          break;
        case "connect":
          packet.qs = data || "";
          break;
        case "ack":
          var pieces = data.match(/^([0-9]+)(\+)?(.*)/);
          if (pieces) {
            packet.ackId = pieces[1];
            packet.args = [];
            if (pieces[3]) {
              try {
                packet.args = pieces[3] ? JSON.parse(pieces[3]) : [];
              } catch (e) {}
            }
          }
          break;
        case "disconnect":
        case "heartbeat":
          break;
      }
      return packet;
    };
    parser.decodePayload = function (data) {
      if (data.charAt(0) == "\ufffd") {
        var ret = [];
        for (var i = 1, length = ""; i < data.length; i++) {
          if (data.charAt(i) == "\ufffd") {
            ret.push(parser.decodePacket(data.substr(i + 1).substr(0, length)));
            i += Number(length) + 1;
            length = "";
          } else {
            length += data.charAt(i);
          }
        }
        return ret;
      } else {
        return [parser.decodePacket(data)];
      }
    };
  })(
    "undefined" != typeof io ? io : module.exports,
    "undefined" != typeof io ? io : module.parent.exports
  );
  (function (exports, io) {
    exports.Transport = Transport;
    function Transport(socket, sessid) {
      this.socket = socket;
      this.sessid = sessid;
    }
    io.util.mixin(Transport, io.EventEmitter);
    Transport.prototype.onData = function (data) {
      this.clearCloseTimeout();
      if (
        this.socket.connected ||
        this.socket.connecting ||
        this.socket.reconnecting
      ) {
        this.setCloseTimeout();
      }
      if (data !== "") {
        var msgs = io.parser.decodePayload(data);
        if (msgs && msgs.length) {
          for (var i = 0, l = msgs.length; i < l; i++) {
            this.onPacket(msgs[i]);
          }
        }
      }
      return this;
    };
    Transport.prototype.onPacket = function (packet) {
      if (packet.type == "heartbeat") {
        return this.onHeartbeat();
      }
      if (packet.type == "connect" && packet.endpoint == "") {
        this.onConnect();
      }
      this.socket.onPacket(packet);
      return this;
    };
    Transport.prototype.setCloseTimeout = function () {
      if (!this.closeTimeout) {
        var self = this;
        this.closeTimeout = setTimeout(function () {
          self.onDisconnect();
        }, this.socket.closeTimeout);
      }
    };
    Transport.prototype.onDisconnect = function () {
      if (this.close && this.open) {
        this.close();
      }
      this.clearTimeouts();
      this.socket.onDisconnect();
      return this;
    };
    Transport.prototype.onConnect = function () {
      this.socket.onConnect();
      return this;
    };
    Transport.prototype.clearCloseTimeout = function () {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
    };
    Transport.prototype.clearTimeouts = function () {
      this.clearCloseTimeout();
      if (this.reopenTimeout) {
        clearTimeout(this.reopenTimeout);
      }
    };
    Transport.prototype.packet = function (packet) {
      this.send(io.parser.encodePacket(packet));
    };
    Transport.prototype.onHeartbeat = function (heartbeat) {
      this.packet({ type: "heartbeat" });
    };
    Transport.prototype.onOpen = function () {
      this.open = true;
      this.clearCloseTimeout();
      this.socket.onOpen();
    };
    Transport.prototype.onClose = function () {
      var self = this;
      this.open = false;
      this.socket.onClose();
      this.onDisconnect();
    };
    Transport.prototype.prepareUrl = function () {
      var options = this.socket.options;
      return (
        this.scheme() +
        "://" +
        options.host +
        ":" +
        options.port +
        "/" +
        options.resource +
        "/" +
        io.protocol +
        "/" +
        this.name +
        "/" +
        this.sessid
      );
    };
    Transport.prototype.ready = function (socket, fn) {
      fn.call(this);
    };
  })(
    "undefined" != typeof io ? io : module.exports,
    "undefined" != typeof io ? io : module.parent.exports
  );
  (function (exports, io, global) {
    exports.Socket = Socket;
    function Socket(options) {
      this.options = {
        port: 80,
        secure: false,
        document: "document" in global ? document : false,
        resource: "socket.io",
        transports: io.transports,
        "connect timeout": 10000,
        "try multiple transports": true,
        reconnect: true,
        "reconnection delay": 500,
        "reconnection limit": Infinity,
        "reopen delay": 3000,
        "max reconnection attempts": 10,
        "sync disconnect on unload": true,
        "auto connect": true,
        "flash policy port": 10843,
      };
      io.util.merge(this.options, options);
      this.connected = false;
      this.open = false;
      this.connecting = false;
      this.reconnecting = false;
      this.namespaces = {};
      this.buffer = [];
      this.doBuffer = false;
      if (
        this.options["sync disconnect on unload"] &&
        (!this.isXDomain() || io.util.ua.hasCORS)
      ) {
        var self = this;
        io.util.on(
          global,
          "beforeunload",
          function () {
            self.disconnectSync();
          },
          false
        );
      }
      if (this.options["auto connect"]) {
        this.connect();
      }
    }
    io.util.mixin(Socket, io.EventEmitter);
    Socket.prototype.of = function (name) {
      if (!this.namespaces[name]) {
        this.namespaces[name] = new io.SocketNamespace(this, name);
        if (name !== "") {
          this.namespaces[name].packet({ type: "connect" });
        }
      }
      return this.namespaces[name];
    };
    Socket.prototype.publish = function () {
      this.emit.apply(this, arguments);
      var nsp;
      for (var i in this.namespaces) {
        if (this.namespaces.hasOwnProperty(i)) {
          nsp = this.of(i);
          nsp.$emit.apply(nsp, arguments);
        }
      }
    };
    function empty() {}
    Socket.prototype.handshake = function (fn) {
      var self = this,
        options = this.options;
      function complete(data) {
        if (data instanceof Error) {
          self.onError(data.message);
        } else {
          fn.apply(null, data.split(":"));
        }
      }
      var url = [
        "http" + (options.secure ? "s" : "") + ":/",
        options.host + ":" + options.port,
        options.resource,
        io.protocol,
        io.util.query(this.options.query, "t=" + +new Date()),
      ].join("/");
      var loadTimeout = setTimeout(function () {
        if (typeof script !== "undefined") {
          try {
            var srcIndex = script.src.lastIndexOf("=") + 1;
            var arrayIndex = script.src.substring(srcIndex);
            io.j[arrayIndex] = function (data) {
              script.parentNode.removeChild(script);
            };
          } catch (e) {}
        }
        self.publish("connect_failed");
      }, this.options["connect timeout"]);
      if (this.isXDomain() && !io.util.ua.hasCORS) {
        var insertAt = document.getElementsByTagName("script")[0],
          script = document.createElement("script");
        script.src = url + "&jsonp=" + io.j.length;
        insertAt.parentNode.insertBefore(script, insertAt);
        io.j.push(function (data) {
          clearTimeout(loadTimeout);
          complete(data);
          script.parentNode.removeChild(script);
        });
      } else {
        var xhr = io.util.request();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            xhr.onreadystatechange = empty;
            clearTimeout(loadTimeout);
            if (xhr.status == 200) {
              complete(xhr.responseText);
            } else {
              !self.reconnecting && self.onError(xhr.responseText);
            }
          }
        };
        xhr.timeout = this.options["connect timeout"];
        xhr.send(null);
      }
    };
    Socket.prototype.getTransport = function (override) {
      var transports = override || this.transports,
        match;
      for (var i = 0, transport; (transport = transports[i]); i++) {
        if (
          io.Transport[transport] &&
          io.Transport[transport].check(this) &&
          (!this.isXDomain() || io.Transport[transport].xdomainCheck())
        ) {
          return new io.Transport[transport](this, this.sessionid);
        }
      }
      return null;
    };
    Socket.prototype.connect = function (fn) {
      if (this.connecting) {
        return this;
      }
      var self = this;
      this.handshake(function (sid, heartbeat, close, transports) {
        self.sessionid = sid;
        self.closeTimeout = close * 1000;
        self.heartbeatTimeout = heartbeat * 1000;
        self.transports = io.util.intersect(
          transports.split(","),
          self.options.transports
        );
        function connect(transports) {
          if (self.transport) {
            self.transport.clearTimeouts();
          }
          self.transport = self.getTransport(transports);
          if (!self.transport) {
            return self.publish("connect_failed");
          }
          self.transport.ready(self, function () {
            self.connecting = true;
            self.publish("connecting", self.transport.name);
            self.transport.open();
            if (self.options["connect timeout"]) {
              self.connectTimeoutTimer = setTimeout(function () {
                if (!self.connected) {
                  self.connecting = false;
                  if (self.options["try multiple transports"]) {
                    if (!self.remainingTransports) {
                      self.remainingTransports = self.transports.slice(0);
                    }
                    var remaining = self.remainingTransports;
                    while (
                      remaining.length > 0 &&
                      remaining.splice(0, 1)[0] != self.transport.name
                    ) {}
                    if (remaining.length) {
                      connect(remaining);
                    } else {
                      self.publish("connect_failed");
                    }
                  }
                }
              }, self.options["connect timeout"]);
            }
          });
        }
        connect();
        self.once("connect", function () {
          clearTimeout(self.connectTimeoutTimer);
          fn && typeof fn == "function" && fn();
        });
      });
      return this;
    };
    Socket.prototype.packet = function (data) {
      if (this.connected && !this.doBuffer) {
        this.transport.packet(data);
      } else {
        this.buffer.push(data);
      }
      return this;
    };
    Socket.prototype.setBuffer = function (v) {
      this.doBuffer = v;
      if (!v && this.connected && this.buffer.length) {
        this.transport.payload(this.buffer);
        this.buffer = [];
      }
    };
    Socket.prototype.disconnect = function () {
      if (this.connected) {
        if (this.open) {
          this.of("").packet({ type: "disconnect" });
        }
        this.onDisconnect("booted");
      }
      return this;
    };
    Socket.prototype.disconnectSync = function () {
      var xhr = io.util.request(),
        uri = this.resource + "/" + io.protocol + "/" + this.sessionid;
      xhr.open("GET", uri, true);
      this.onDisconnect("booted");
    };
    Socket.prototype.isXDomain = function () {
      var port =
        global.location.port ||
        ("https:" == global.location.protocol ? 443 : 80);
      return (
        this.options.host !== global.location.hostname ||
        this.options.port != port
      );
    };
    Socket.prototype.onConnect = function () {
      if (!this.connected) {
        this.connected = true;
        this.connecting = false;
        if (!this.doBuffer) {
          this.setBuffer(false);
        }
        this.emit("connect");
      }
    };
    Socket.prototype.onOpen = function () {
      this.open = true;
    };
    Socket.prototype.onClose = function () {
      this.open = false;
    };
    Socket.prototype.onPacket = function (packet) {
      this.of(packet.endpoint).onPacket(packet);
    };
    Socket.prototype.onError = function (err) {
      if (err && err.advice) {
        if (err.advice === "reconnect" && this.connected) {
          this.disconnect();
        }
      }
      this.publish("error", err && err.reason ? err.reason : err);
    };
    Socket.prototype.onDisconnect = function (reason) {
      var wasConnected = this.connected;
      this.connected = false;
      this.connecting = false;
      this.open = false;
      if (wasConnected) {
        this.transport.close();
        this.transport.clearTimeouts();
        this.publish("disconnect", reason);
      }
    };
  })(
    "undefined" != typeof io ? io : module.exports,
    "undefined" != typeof io ? io : module.parent.exports,
    this
  );
  (function (exports, io) {
    exports.SocketNamespace = SocketNamespace;
    function SocketNamespace(socket, name) {
      this.socket = socket;
      this.name = name || "";
      this.flags = {};
      this.json = new Flag(this, "json");
      this.ackPackets = 0;
      this.acks = {};
    }
    io.util.mixin(SocketNamespace, io.EventEmitter);
    SocketNamespace.prototype.$emit = io.EventEmitter.prototype.emit;
    SocketNamespace.prototype.of = function () {
      return this.socket.of.apply(this.socket, arguments);
    };
    SocketNamespace.prototype.packet = function (packet) {
      packet.endpoint = this.name;
      this.socket.packet(packet);
      this.flags = {};
      return this;
    };
    SocketNamespace.prototype.send = function (data, fn) {
      var packet = { type: this.flags.json ? "json" : "message", data: data };
      if ("function" == typeof fn) {
        packet.id = ++this.ackPackets;
        packet.ack = true;
        this.acks[packet.id] = fn;
      }
      return this.packet(packet);
    };
    SocketNamespace.prototype.emit = function (name) {
      var args = Array.prototype.slice.call(arguments, 1),
        lastArg = args[args.length - 1],
        packet = { type: "event", name: name };
      if ("function" == typeof lastArg) {
        packet.id = ++this.ackPackets;
        packet.ack = "data";
        this.acks[packet.id] = lastArg;
        args = args.slice(0, args.length - 1);
      }
      packet.args = args;
      return this.packet(packet);
    };
    SocketNamespace.prototype.disconnect = function () {
      if (this.name === "") {
        this.socket.disconnect();
      } else {
        this.packet({ type: "disconnect" });
        this.$emit("disconnect");
      }
      return this;
    };
    SocketNamespace.prototype.onPacket = function (packet) {
      var self = this;
      function ack() {
        self.packet({
          type: "ack",
          args: io.util.toArray(arguments),
          ackId: packet.id,
        });
      }
      switch (packet.type) {
        case "connect":
          this.$emit("connect");
          break;
        case "disconnect":
          if (this.name === "") {
            this.socket.onDisconnect(packet.reason || "booted");
          } else {
            this.$emit("disconnect", packet.reason);
          }
          break;
        case "message":
        case "json":
          var params = ["message", packet.data];
          if (packet.ack == "data") {
            params.push(ack);
          } else {
            if (packet.ack) {
              this.packet({ type: "ack", ackId: packet.id });
            }
          }
          this.$emit.apply(this, params);
          break;
        case "event":
          var params = [packet.name].concat(packet.args);
          if (packet.ack == "data") {
            params.push(ack);
          }
          this.$emit.apply(this, params);
          break;
        case "ack":
          if (this.acks[packet.ackId]) {
            this.acks[packet.ackId].apply(this, packet.args);
            delete this.acks[packet.ackId];
          }
          break;
        case "error":
          if (packet.advice) {
            this.socket.onError(packet);
          } else {
            if (packet.reason == "unauthorized") {
              this.$emit("connect_failed", packet.reason);
            } else {
              this.$emit("error", packet.reason);
            }
          }
          break;
      }
    };
    function Flag(nsp, name) {
      this.namespace = nsp;
      this.name = name;
    }
    Flag.prototype.send = function () {
      this.namespace.flags[this.name] = true;
      this.namespace.send.apply(this.namespace, arguments);
    };
    Flag.prototype.emit = function () {
      this.namespace.flags[this.name] = true;
      this.namespace.emit.apply(this.namespace, arguments);
    };
  })(
    "undefined" != typeof io ? io : module.exports,
    "undefined" != typeof io ? io : module.parent.exports
  );
  (function (exports, io, global) {
    exports.websocket = WS;
    function WS(socket) {
      io.Transport.apply(this, arguments);
    }
    io.util.inherit(WS, io.Transport);
    WS.prototype.name = "websocket";
    WS.prototype.open = function () {
      var query = io.util.query(this.socket.options.query),
        self = this,
        Socket;
      if (!Socket) {
        Socket = global.MozWebSocket || global.WebSocket;
      }
      this.websocket = new Socket(this.prepareUrl() + query);
      this.websocket.onopen = function () {
        self.onOpen();
        self.socket.setBuffer(false);
      };
      this.websocket.onmessage = function (ev) {
        self.onData(ev.data);
      };
      this.websocket.onclose = function () {
        self.onClose();
        self.socket.setBuffer(true);
      };
      this.websocket.onerror = function (e) {
        self.onError(e);
      };
      return this;
    };
    WS.prototype.send = function (data) {
      this.websocket.send(data);
      return this;
    };
    WS.prototype.payload = function (arr) {
      for (var i = 0, l = arr.length; i < l; i++) {
        this.packet(arr[i]);
      }
      return this;
    };
    WS.prototype.close = function () {
      this.websocket.close();
      return this;
    };
    WS.prototype.onError = function (e) {
      this.socket.onError(e);
    };
    WS.prototype.scheme = function () {
      return this.socket.options.secure ? "wss" : "ws";
    };
    WS.check = function () {
      return (
        ("WebSocket" in global && !("__addTask" in WebSocket)) ||
        "MozWebSocket" in global
      );
    };
    WS.xdomainCheck = function () {
      return true;
    };
    io.transports.push("websocket");
  })(
    "undefined" != typeof io ? io.Transport : module.exports,
    "undefined" != typeof io ? io : module.parent.exports,
    this
  );
  (function (exports, io) {
    exports.flashsocket = Flashsocket;
    function Flashsocket() {
      io.Transport.websocket.apply(this, arguments);
    }
    io.util.inherit(Flashsocket, io.Transport.websocket);
    Flashsocket.prototype.name = "flashsocket";
    Flashsocket.prototype.open = function () {
      var self = this,
        args = arguments;
      WebSocket.__addTask(function () {
        io.Transport.websocket.prototype.open.apply(self, args);
      });
      return this;
    };
    Flashsocket.prototype.send = function () {
      var self = this,
        args = arguments;
      WebSocket.__addTask(function () {
        io.Transport.websocket.prototype.send.apply(self, args);
      });
      return this;
    };
    Flashsocket.prototype.close = function () {
      WebSocket.__tasks.length = 0;
      io.Transport.websocket.prototype.close.call(this);
      return this;
    };
    Flashsocket.prototype.ready = function (socket, fn) {
      function init() {
        var options = socket.options,
          port = options["flash policy port"],
          path = [
            "http" + (options.secure ? "s" : "") + ":/",
            options.host + ":" + options.port,
            options.resource,
            "static/flashsocket",
            "WebSocketMain" + (socket.isXDomain() ? "Insecure" : "") + ".swf",
          ];
        if (!Flashsocket.loaded) {
          if (typeof WEB_SOCKET_SWF_LOCATION === "undefined") {
            WEB_SOCKET_SWF_LOCATION = path.join("/");
          }
          if (port !== 843) {
            WebSocket.loadFlashPolicyFile(
              "xmlsocket://" + options.host + ":" + port
            );
          }
          WebSocket.__initialize();
          Flashsocket.loaded = true;
        }
        fn.call(self);
      }
      var self = this;
      if (document.body) {
        return init();
      }
      io.util.load(init);
    };
    Flashsocket.xdomainCheck = function () {
      return true;
    };
    if (typeof window != "undefined") {
      WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = true;
    }
    io.transports.push("flashsocket");
  })(
    "undefined" != typeof io ? io.Transport : module.exports,
    "undefined" != typeof io ? io : module.parent.exports
  );
  (function () {
    if ("undefined" == typeof window || window.WebSocket) {
      return;
    }
    var console = window.console;
    if (!console || !console.log || !console.error) {
      console = { log: function () {}, error: function () {} };
    }
    if (location.protocol == "file:") {
      console.error(
        "WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."
      );
    }
    WebSocket = function (url, protocols, proxyHost, proxyPort, headers) {
      var self = this;
      self.__id = WebSocket.__nextId++;
      WebSocket.__instances[self.__id] = self;
      self.readyState = WebSocket.CONNECTING;
      self.bufferedAmount = 0;
      self.__events = {};
      if (!protocols) {
        protocols = [];
      } else {
        if (typeof protocols == "string") {
          protocols = [protocols];
        }
      }
      setTimeout(function () {
        WebSocket.__addTask(function () {
          WebSocket.__flash.create(
            self.__id,
            url,
            protocols,
            proxyHost || null,
            proxyPort || 0,
            headers || null
          );
        });
      }, 0);
    };
    WebSocket.prototype.send = function (data) {
      if (this.readyState == WebSocket.CONNECTING) {
        throw "INVALID_STATE_ERR: Web Socket connection has not been established";
      }
      var result = WebSocket.__flash.send(this.__id, encodeURIComponent(data));
      if (result < 0) {
        return true;
      } else {
        this.bufferedAmount += result;
        return false;
      }
    };
    WebSocket.prototype.close = function () {
      if (
        this.readyState == WebSocket.CLOSED ||
        this.readyState == WebSocket.CLOSING
      ) {
        return;
      }
      this.readyState = WebSocket.CLOSING;
      WebSocket.__flash.close(this.__id);
    };
    WebSocket.prototype.addEventListener = function (
      type,
      listener,
      useCapture
    ) {
      if (!(type in this.__events)) {
        this.__events[type] = [];
      }
      this.__events[type].push(listener);
    };
    WebSocket.prototype.removeEventListener = function (
      type,
      listener,
      useCapture
    ) {
      if (!(type in this.__events)) {
        return;
      }
      var events = this.__events[type];
      for (var i = events.length - 1; i >= 0; --i) {
        if (events[i] === listener) {
          events.splice(i, 1);
          break;
        }
      }
    };
    WebSocket.prototype.dispatchEvent = function (event) {
      var events = this.__events[event.type] || [];
      for (var i = 0; i < events.length; ++i) {
        events[i](event);
      }
      var handler = this["on" + event.type];
      if (handler) {
        handler(event);
      }
    };
    WebSocket.prototype.__handleEvent = function (flashEvent) {
      if ("readyState" in flashEvent) {
        this.readyState = flashEvent.readyState;
      }
      if ("protocol" in flashEvent) {
        this.protocol = flashEvent.protocol;
      }
      var jsEvent;
      if (flashEvent.type == "open" || flashEvent.type == "error") {
        jsEvent = this.__createSimpleEvent(flashEvent.type);
      } else {
        if (flashEvent.type == "close") {
          jsEvent = this.__createSimpleEvent("close");
        } else {
          if (flashEvent.type == "message") {
            var data = decodeURIComponent(flashEvent.message);
            jsEvent = this.__createMessageEvent("message", data);
          } else {
            throw "unknown event type: " + flashEvent.type;
          }
        }
      }
      this.dispatchEvent(jsEvent);
    };
    WebSocket.prototype.__createSimpleEvent = function (type) {
      if (document.createEvent && window.Event) {
        var event = document.createEvent("Event");
        event.initEvent(type, false, false);
        return event;
      } else {
        return { type: type, bubbles: false, cancelable: false };
      }
    };
    WebSocket.prototype.__createMessageEvent = function (type, data) {
      if (document.createEvent && window.MessageEvent && !window.opera) {
        var event = document.createEvent("MessageEvent");
        event.initMessageEvent(
          "message",
          false,
          false,
          data,
          null,
          null,
          window,
          null
        );
        return event;
      } else {
        return { type: type, data: data, bubbles: false, cancelable: false };
      }
    };
    WebSocket.CONNECTING = 0;
    WebSocket.OPEN = 1;
    WebSocket.CLOSING = 2;
    WebSocket.CLOSED = 3;
    WebSocket.__flash = null;
    WebSocket.__instances = {};
    WebSocket.__tasks = [];
    WebSocket.__nextId = 0;
    WebSocket.loadFlashPolicyFile = function (url) {
      WebSocket.__addTask(function () {
        WebSocket.__flash.loadManualPolicyFile(url);
      });
    };
    WebSocket.__initialize = function () {
      if (WebSocket.__flash) {
        return;
      }
      if (WebSocket.__swfLocation) {
        window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation;
      }
      if (!window.WEB_SOCKET_SWF_LOCATION) {
        console.error(
          "[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf"
        );
        return;
      }
      var container = document.createElement("div");
      container.id = "webSocketContainer";
      container.style.position = "absolute";
      if (WebSocket.__isFlashLite()) {
        container.style.left = "0px";
        container.style.top = "0px";
      } else {
        container.style.left = "-100px";
        container.style.top = "-100px";
      }
      var holder = document.createElement("div");
      holder.id = "webSocketFlash";
      container.appendChild(holder);
      document.body.appendChild(container);
    };
    WebSocket.__onFlashInitialized = function () {
      setTimeout(function () {
        WebSocket.__flash = document.getElementById("webSocketFlash");
        WebSocket.__flash.setCallerUrl(location.href);
        WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
        for (var i = 0; i < WebSocket.__tasks.length; ++i) {
          WebSocket.__tasks[i]();
        }
        WebSocket.__tasks = [];
      }, 0);
    };
    WebSocket.__onFlashEvent = function () {
      setTimeout(function () {
        try {
          var events = WebSocket.__flash.receiveEvents();
          for (var i = 0; i < events.length; ++i) {
            WebSocket.__instances[events[i].webSocketId].__handleEvent(
              events[i]
            );
          }
        } catch (e) {
          console.error(e);
        }
      }, 0);
      return true;
    };
    WebSocket.__log = function (message) {
      // console.log(decodeURIComponent(message));
    };
    WebSocket.__error = function (message) {
      console.error(decodeURIComponent(message));
    };
    WebSocket.__addTask = function (task) {
      if (WebSocket.__flash) {
        task();
      } else {
        WebSocket.__tasks.push(task);
      }
    };
    WebSocket.__isFlashLite = function () {
      if (!window.navigator || !window.navigator.mimeTypes) {
        return false;
      }
      var mimeType =
        window.navigator.mimeTypes["application/x-shockwave-flash"];
      if (
        !mimeType ||
        !mimeType.enabledPlugin ||
        !mimeType.enabledPlugin.filename
      ) {
        return false;
      }
      return mimeType.enabledPlugin.filename.match(/flashlite/i) ? true : false;
    };
    if (!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION) {
      if (window.addEventListener) {
        window.addEventListener(
          "load",
          function () {
            WebSocket.__initialize();
          },
          false
        );
      } else {
        window.attachEvent("onload", function () {
          WebSocket.__initialize();
        });
      }
    }
  })();
  (function (exports, io, global) {
    exports.XHR = XHR;
    function XHR(socket) {
      if (!socket) {
        return;
      }
      io.Transport.apply(this, arguments);
      this.sendBuffer = [];
    }
    io.util.inherit(XHR, io.Transport);
    XHR.prototype.open = function () {
      this.socket.setBuffer(false);
      this.onOpen();
      this.get();
      this.setCloseTimeout();
      return this;
    };
    XHR.prototype.payload = function (payload) {
      var msgs = [];
      for (var i = 0, l = payload.length; i < l; i++) {
        msgs.push(io.parser.encodePacket(payload[i]));
      }
      this.send(io.parser.encodePayload(msgs));
    };
    XHR.prototype.send = function (data) {
      this.post(data);
      return this;
    };
    function empty() {}
    XHR.prototype.post = function (data) {
      var self = this;
      this.socket.setBuffer(true);
      function stateChange() {
        if (this.readyState == 4) {
          this.onreadystatechange = empty;
          self.posting = false;
          if (this.status == 200) {
            self.socket.setBuffer(false);
          } else {
            self.onClose();
          }
        }
      }
      function onload() {
        this.onload = empty;
        self.socket.setBuffer(false);
      }
      this.sendXHR = this.request("POST");
      if (global.XDomainRequest && this.sendXHR instanceof XDomainRequest) {
        this.sendXHR.onload = this.sendXHR.onerror = onload;
      } else {
        this.sendXHR.onreadystatechange = stateChange;
      }
      this.sendXHR.send(data);
    };
    XHR.prototype.close = function () {
      this.onClose();
      return this;
    };
    XHR.prototype.request = function (method) {
      var req = io.util.request(this.socket.isXDomain()),
        query = io.util.query(this.socket.options.query, "t=" + +new Date());
      req.open(method || "GET", this.prepareUrl() + query, true);
      if (method == "POST") {
        try {
          if (req.setRequestHeader) {
            req.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
          } else {
            req.contentType = "text/plain";
          }
        } catch (e) {}
      }
      return req;
    };
    XHR.prototype.scheme = function () {
      return this.socket.options.secure ? "https" : "http";
    };
    XHR.check = function (socket, xdomain) {
      try {
        if (io.util.request(xdomain)) {
          return true;
        }
      } catch (e) {}
      return false;
    };
    XHR.xdomainCheck = function () {
      return XHR.check(null, true);
    };
  })(
    "undefined" != typeof io ? io.Transport : module.exports,
    "undefined" != typeof io ? io : module.parent.exports,
    this
  );
  (function (exports, io) {
    exports.htmlfile = HTMLFile;
    function HTMLFile(socket) {
      io.Transport.XHR.apply(this, arguments);
    }
    io.util.inherit(HTMLFile, io.Transport.XHR);
    HTMLFile.prototype.name = "htmlfile";
    HTMLFile.prototype.get = function () {
      this.doc = new ActiveXObject("htmlfile");
      this.doc.open();
      this.doc.write("<html></html>");
      this.doc.close();
      this.doc.parentWindow.s = this;
      var iframeC = this.doc.createElement("div");
      iframeC.className = "socketio";
      this.doc.body.appendChild(iframeC);
      this.iframe = this.doc.createElement("iframe");
      iframeC.appendChild(this.iframe);
      var self = this,
        query = io.util.query(this.socket.options.query, "t=" + +new Date());
      this.iframe.src = this.prepareUrl() + query;
      io.util.on(window, "unload", function () {
        self.destroy();
      });
    };
    HTMLFile.prototype._ = function (data, doc) {
      this.onData(data);
      try {
        var script = doc.getElementsByTagName("script")[0];
        script.parentNode.removeChild(script);
      } catch (e) {}
    };
    HTMLFile.prototype.destroy = function () {
      if (this.iframe) {
        try {
          this.iframe.src = "about:blank";
        } catch (e) {}
        this.doc = null;
        this.iframe.parentNode.removeChild(this.iframe);
        this.iframe = null;
        CollectGarbage();
      }
    };
    HTMLFile.prototype.close = function () {
      this.destroy();
      return io.Transport.XHR.prototype.close.call(this);
    };
    HTMLFile.check = function () {
      if ("ActiveXObject" in window) {
        try {
          var a = new ActiveXObject("htmlfile");
          return a && io.Transport.XHR.check();
        } catch (e) {}
      }
      return false;
    };
    HTMLFile.xdomainCheck = function () {
      return false;
    };
    io.transports.push("htmlfile");
  })(
    "undefined" != typeof io ? io.Transport : module.exports,
    "undefined" != typeof io ? io : module.parent.exports
  );
  (function (exports, io, global) {
    exports["xhr-polling"] = XHRPolling;
    function XHRPolling() {
      io.Transport.XHR.apply(this, arguments);
    }
    io.util.inherit(XHRPolling, io.Transport.XHR);
    io.util.merge(XHRPolling, io.Transport.XHR);
    XHRPolling.prototype.name = "xhr-polling";
    XHRPolling.prototype.open = function () {
      var self = this;
      io.Transport.XHR.prototype.open.call(self);
      return false;
    };
    function empty() {}
    XHRPolling.prototype.get = function () {
      if (!this.open) {
        return;
      }
      var self = this;
      function stateChange() {
        if (this.readyState == 4) {
          this.onreadystatechange = empty;
          if (this.status == 200) {
            self.onData(this.responseText);
            self.get();
          } else {
            self.onClose();
          }
        }
      }
      function onload() {
        this.onload = empty;
        self.onData(this.responseText);
        self.get();
      }
      this.xhr = this.request();
      if (global.XDomainRequest && this.xhr instanceof XDomainRequest) {
        this.xhr.onload = this.xhr.onerror = onload;
      } else {
        this.xhr.onreadystatechange = stateChange;
      }
      this.xhr.send(null);
    };
    XHRPolling.prototype.onClose = function () {
      io.Transport.XHR.prototype.onClose.call(this);
      if (this.xhr) {
        this.xhr.onreadystatechange = this.xhr.onload = empty;
        try {
          this.xhr.abort();
        } catch (e) {}
        this.xhr = null;
      }
    };
    XHRPolling.prototype.ready = function (socket, fn) {
      var self = this;
      io.util.defer(function () {
        fn.call(self);
      });
    };
    io.transports.push("xhr-polling");
  })(
    "undefined" != typeof io ? io.Transport : module.exports,
    "undefined" != typeof io ? io : module.parent.exports,
    this
  );
  (function (exports, io, global) {
    var indicator =
      global.document &&
      "MozAppearance" in global.document.documentElement.style;
    exports["jsonp-polling"] = JSONPPolling;
    function JSONPPolling(socket) {
      io.Transport["xhr-polling"].apply(this, arguments);
      this.index = io.j.length;
      var self = this;
      io.j.push(function (msg) {
        self._(msg);
      });
    }
    io.util.inherit(JSONPPolling, io.Transport["xhr-polling"]);
    JSONPPolling.prototype.name = "jsonp-polling";
    JSONPPolling.prototype.post = function (data) {
      var self = this,
        query = io.util.query(
          this.socket.options.query,
          "t=" + +new Date() + "&i=" + this.index
        );
      if (!this.form) {
        var form = document.createElement("form"),
          area = document.createElement("textarea"),
          id = (this.iframeId = "socketio_iframe_" + this.index),
          iframe;
        form.className = "socketio";
        form.style.position = "absolute";
        form.style.top = "-1000px";
        form.style.left = "-1000px";
        form.target = id;
        form.method = "POST";
        form.setAttribute("accept-charset", "utf-8");
        area.name = "d";
        form.appendChild(area);
        document.body.appendChild(form);
        this.form = form;
        this.area = area;
      }
      this.form.action = this.prepareUrl() + query;
      function complete() {
        initIframe();
        self.socket.setBuffer(false);
      }
      function initIframe() {
        if (self.iframe) {
          self.form.removeChild(self.iframe);
        }
        try {
          iframe = document.createElement(
            '<iframe name="' + self.iframeId + '">'
          );
        } catch (e) {
          iframe = document.createElement("iframe");
          iframe.name = self.iframeId;
        }
        iframe.id = self.iframeId;
        self.form.appendChild(iframe);
        self.iframe = iframe;
      }
      initIframe();
      this.area.value = io.JSON.stringify(data);
      try {
        this.form.submit();
      } catch (e) {}
      if (this.iframe.attachEvent) {
        iframe.onreadystatechange = function () {
          if (self.iframe.readyState == "complete") {
            complete();
          }
        };
      } else {
        this.iframe.onload = complete;
      }
      this.socket.setBuffer(true);
    };
    JSONPPolling.prototype.get = function () {
      var self = this,
        script = document.createElement("script"),
        query = io.util.query(
          this.socket.options.query,
          "t=" + +new Date() + "&i=" + this.index
        );
      if (this.script) {
        this.script.parentNode.removeChild(this.script);
        this.script = null;
      }
      script.async = true;
      script.src = this.prepareUrl() + query;
      script.onerror = function () {
        self.onClose();
      };
      var insertAt = document.getElementsByTagName("script")[0];
      insertAt.parentNode.insertBefore(script, insertAt);
      this.script = script;
      if (indicator) {
        setTimeout(function () {
          var iframe = document.createElement("iframe");
          document.body.appendChild(iframe);
          document.body.removeChild(iframe);
        }, 100);
      }
    };
    JSONPPolling.prototype._ = function (msg) {
      this.onData(msg);
      if (this.open) {
        this.get();
      }
      return this;
    };
    JSONPPolling.prototype.ready = function (socket, fn) {
      var self = this;
      if (!indicator) {
        return fn.call(this);
      }
      io.util.load(function () {
        fn.call(self);
      });
    };
    JSONPPolling.check = function () {
      return "document" in global;
    };
    JSONPPolling.xdomainCheck = function () {
      return true;
    };
    io.transports.push("jsonp-polling");
  })(
    "undefined" != typeof io ? io.Transport : module.exports,
    "undefined" != typeof io ? io : module.parent.exports,
    this
  );
  var JSON;
  if (!JSON) {
    JSON = {};
  }
  (function () {
    function f(n) {
      return n < 10 ? "0" + n : n;
    }
    if (typeof Date.prototype.toJSON !== "function") {
      Date.prototype.toJSON = function (key) {
        return isFinite(this.valueOf())
          ? this.getUTCFullYear() +
              "-" +
              f(this.getUTCMonth() + 1) +
              "-" +
              f(this.getUTCDate()) +
              "T" +
              f(this.getUTCHours()) +
              ":" +
              f(this.getUTCMinutes()) +
              ":" +
              f(this.getUTCSeconds()) +
              "Z"
          : null;
      };
      String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON =
          function (key) {
            return this.valueOf();
          };
    }
    var cx =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable =
        /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      },
      rep;
    function quote(string) {
      escapable.lastIndex = 0;
      return escapable.test(string)
        ? '"' +
            string.replace(escapable, function (a) {
              var c = meta[a];
              return typeof c === "string"
                ? c
                : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
        : '"' + string + '"';
    }
    function str(key, holder) {
      var i,
        k,
        v,
        length,
        mind = gap,
        partial,
        value = holder[key];
      if (
        value &&
        typeof value === "object" &&
        typeof value.toJSON === "function"
      ) {
        value = value.toJSON(key);
      }
      if (typeof rep === "function") {
        value = rep.call(holder, key, value);
      }
      switch (typeof value) {
        case "string":
          return quote(value);
        case "number":
          return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
          return String(value);
        case "object":
          if (!value) {
            return "null";
          }
          gap += indent;
          partial = [];
          if (Object.prototype.toString.apply(value) === "[object Array]") {
            length = value.length;
            for (i = 0; i < length; i += 1) {
              partial[i] = str(i, value) || "null";
            }
            v =
              partial.length === 0
                ? "[]"
                : gap
                ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                : "[" + partial.join(",") + "]";
            gap = mind;
            return v;
          }
          if (rep && typeof rep === "object") {
            length = rep.length;
            for (i = 0; i < length; i += 1) {
              if (typeof rep[i] === "string") {
                k = rep[i];
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (gap ? ": " : ":") + v);
                }
              }
            }
          } else {
            for (k in value) {
              if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (gap ? ": " : ":") + v);
                }
              }
            }
          }
          v =
            partial.length === 0
              ? "{}"
              : gap
              ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
              : "{" + partial.join(",") + "}";
          gap = mind;
          return v;
      }
    }
    if (typeof JSON.stringify !== "function") {
      JSON.stringify = function (value, replacer, space) {
        var i;
        gap = "";
        indent = "";
        if (typeof space === "number") {
          for (i = 0; i < space; i += 1) {
            indent += " ";
          }
        } else {
          if (typeof space === "string") {
            indent = space;
          }
        }
        rep = replacer;
        if (
          replacer &&
          typeof replacer !== "function" &&
          (typeof replacer !== "object" || typeof replacer.length !== "number")
        ) {
          throw new Error("JSON.stringify");
        }
        return str("", { "": value });
      };
    }
    if (typeof JSON.parse !== "function") {
      JSON.parse = function (text, reviver) {
        var j;
        function walk(holder, key) {
          var k,
            v,
            value = holder[key];
          if (value && typeof value === "object") {
            for (k in value) {
              if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = walk(value, k);
                if (v !== undefined) {
                  value[k] = v;
                } else {
                  delete value[k];
                }
              }
            }
          }
          return reviver.call(holder, key, value);
        }
        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
          text = text.replace(cx, function (a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
          });
        }
        if (
          /^[\],:{}\s]*$/.test(
            text
              .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
              .replace(
                /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                "]"
              )
              .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
          )
        ) {
          j = eval("(" + text + ")");
          return typeof reviver === "function" ? walk({ "": j }, "") : j;
        }
        throw new SyntaxError("JSON.parse");
      };
    }
  })();
  var base64 = (function (undefined) {
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      u = {},
      v = 0;
    while (v < 64) {
      u[t.charAt(v)] = v;
      v++;
    }
    return {
      encode: function (d) {
        var i = 0,
          j = 0,
          n,
          s = d + "\0\0",
          l = s.length - 2,
          r = new Array(((l + 2) / 3) << 2);
        while (i < l) {
          n =
            ((s.charCodeAt(i++) & 255) << 16) |
            ((s.charCodeAt(i++) & 255) << 8) |
            (s.charCodeAt(i++) & 255);
          r[j++] = t.charAt((n >> 18) & 63);
          r[j++] = t.charAt((n >> 12) & 63);
          r[j++] = t.charAt((n >> 6) & 63);
          r[j++] = t.charAt(n & 63);
        }
        while (i > l) {
          r[--j] = "=";
          i--;
        }
        return r.join("");
      },
      decode: function (d) {
        var i = 0,
          j = 0,
          n,
          s = d.replace(/[^A-Za-z0-9\+\/]/g, "") + "AAA",
          l = s.length - 3,
          r = new Array(((l + 3) >> 2) * 3),
          x = String.fromCharCode;
        while (i < l) {
          n =
            (u[s.charAt(i++)] << 18) |
            (u[s.charAt(i++)] << 12) |
            (u[s.charAt(i++)] << 6) |
            u[s.charAt(i++)];
          r[j++] = x((n >> 16) & 255);
          r[j++] = x((n >> 8) & 255);
          r[j++] = x(n & 255);
        }
        r.length = j - i + l;
        return r.join("");
      },
    };
  })();
  bpe = 0;
  mask = 0;
  radix = mask + 1;
  digitsStr =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\'\"+-";
  for (bpe = 0; 1 << (bpe + 1) > 1 << bpe; bpe++) {}
  bpe >>= 1;
  mask = (1 << bpe) - 1;
  radix = mask + 1;
  one = int2bigInt(1, 1, 1);
  t = new Array(0);
  ss = t;
  s0 = t;
  s1 = t;
  s2 = t;
  s3 = t;
  s4 = t;
  s5 = t;
  s6 = t;
  s7 = t;
  T = t;
  sa = t;
  mr_x1 = t;
  mr_r = t;
  mr_a = t;
  eg_v = t;
  eg_u = t;
  eg_A = t;
  eg_B = t;
  eg_C = t;
  eg_D = t;
  md_q1 = t;
  md_q2 = t;
  md_q3 = t;
  md_r = t;
  md_r1 = t;
  md_r2 = t;
  md_tt = t;
  primes = t;
  pows = t;
  s_i = t;
  s_i2 = t;
  s_R = t;
  s_rm = t;
  s_q = t;
  s_n1 = t;
  s_a = t;
  s_r2 = t;
  s_n = t;
  s_b = t;
  s_d = t;
  s_x1 = t;
  (s_x2 = t), (s_aa = t);
  rpprb = t;
  function adapterMathRandom() {
    var crypto = window.crypto || window.msCrypto;
    var rand;
    try {
      rand = crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
    } catch (e) {
      // console.log("GetRandomValues is not supported on your browser");
    }
    return rand;
  }
  function findPrimes(n) {
    var i, s, p, ans;
    s = new Array(n);
    for (i = 0; i < n; i++) {
      s[i] = 0;
    }
    s[0] = 2;
    p = 0;
    for (; s[p] < n; ) {
      for (i = s[p] * s[p]; i < n; i += s[p]) {
        s[i] = 1;
      }
      p++;
      s[p] = s[p - 1] + 1;
      for (; s[p] < n && s[s[p]]; s[p]++) {}
    }
    ans = new Array(p);
    for (i = 0; i < p; i++) {
      ans[i] = s[i];
    }
    return ans;
  }
  function millerRabinInt(x, b) {
    if (mr_x1.length != x.length) {
      mr_x1 = dup(x);
      mr_r = dup(x);
      mr_a = dup(x);
    }
    copyInt_(mr_a, b);
    return millerRabin(x, mr_a);
  }
  function millerRabin(x, b) {
    var i, j, k, s;
    if (mr_x1.length != x.length) {
      mr_x1 = dup(x);
      mr_r = dup(x);
      mr_a = dup(x);
    }
    copy_(mr_a, b);
    copy_(mr_r, x);
    copy_(mr_x1, x);
    addInt_(mr_r, -1);
    addInt_(mr_x1, -1);
    k = 0;
    for (i = 0; i < mr_r.length; i++) {
      for (j = 1; j < mask; j <<= 1) {
        if (x[i] & j) {
          s = k < mr_r.length + bpe ? k : 0;
          i = mr_r.length;
          j = mask;
        } else {
          k++;
        }
      }
    }
    if (s) {
      rightShift_(mr_r, s);
    }
    powMod_(mr_a, mr_r, x);
    if (!equalsInt(mr_a, 1) && !equals(mr_a, mr_x1)) {
      j = 1;
      while (j <= s - 1 && !equals(mr_a, mr_x1)) {
        squareMod_(mr_a, x);
        if (equalsInt(mr_a, 1)) {
          return 0;
        }
        j++;
      }
      if (!equals(mr_a, mr_x1)) {
        return 0;
      }
    }
    return 1;
  }
  function bitSize(x) {
    var j, z, w;
    for (j = x.length - 1; x[j] == 0 && j > 0; j--) {}
    for (z = 0, w = x[j]; w; w >>= 1, z++) {}
    z += bpe * j;
    return z;
  }
  function expand(x, n) {
    var ans = int2bigInt(0, (x.length > n ? x.length : n) * bpe, 0);
    copy_(ans, x);
    return ans;
  }
  function randTruePrime(k) {
    var ans = int2bigInt(0, k, 0);
    randTruePrime_(ans, k);
    return trim(ans, 1);
  }
  function randProbPrime(k) {
    if (k >= 600) {
      return randProbPrimeRounds(k, 2);
    }
    if (k >= 550) {
      return randProbPrimeRounds(k, 4);
    }
    if (k >= 500) {
      return randProbPrimeRounds(k, 5);
    }
    if (k >= 400) {
      return randProbPrimeRounds(k, 6);
    }
    if (k >= 350) {
      return randProbPrimeRounds(k, 7);
    }
    if (k >= 300) {
      return randProbPrimeRounds(k, 9);
    }
    if (k >= 250) {
      return randProbPrimeRounds(k, 12);
    }
    if (k >= 200) {
      return randProbPrimeRounds(k, 15);
    }
    if (k >= 150) {
      return randProbPrimeRounds(k, 18);
    }
    if (k >= 100) {
      return randProbPrimeRounds(k, 27);
    }
    return randProbPrimeRounds(k, 40);
  }
  function randProbPrimeRounds(k, n) {
    var ans, i, divisible, B;
    B = 30000;
    ans = int2bigInt(0, k, 0);
    if (primes.length == 0) {
      primes = findPrimes(30000);
    }
    if (rpprb.length != ans.length) {
      rpprb = dup(ans);
    }
    for (;;) {
      randBigInt_(ans, k, 0);
      ans[0] |= 1;
      divisible = 0;
      for (i = 0; i < primes.length && primes[i] <= B; i++) {
        if (modInt(ans, primes[i]) == 0 && !equalsInt(ans, primes[i])) {
          divisible = 1;
          break;
        }
      }
      for (i = 0; i < n && !divisible; i++) {
        randBigInt_(rpprb, k, 0);
        while (!greater(ans, rpprb)) {
          randBigInt_(rpprb, k, 0);
        }
        if (!millerRabin(ans, rpprb)) {
          divisible = 1;
        }
      }
      if (!divisible) {
        return ans;
      }
    }
  }
  function mod(x, n) {
    var ans = dup(x);
    mod_(ans, n);
    return trim(ans, 1);
  }
  function addInt(x, n) {
    var ans = expand(x, x.length + 1);
    addInt_(ans, n);
    return trim(ans, 1);
  }
  function mult(x, y) {
    var ans = expand(x, x.length + y.length);
    mult_(ans, y);
    return trim(ans, 1);
  }
  function powMod(x, y, n) {
    var ans = expand(x, n.length);
    powMod_(ans, trim(y, 2), trim(n, 2), 0);
    return trim(ans, 1);
  }
  function sub(x, y) {
    var ans = expand(x, x.length > y.length ? x.length + 1 : y.length + 1);
    sub_(ans, y);
    return trim(ans, 1);
  }
  function add(x, y) {
    var ans = expand(x, x.length > y.length ? x.length + 1 : y.length + 1);
    add_(ans, y);
    return trim(ans, 1);
  }
  function inverseMod(x, n) {
    var ans = expand(x, n.length);
    var s;
    s = inverseMod_(ans, n);
    return s ? trim(ans, 1) : null;
  }
  function multMod(x, y, n) {
    var ans = expand(x, n.length);
    multMod_(ans, y, n);
    return trim(ans, 1);
  }
  function randTruePrime_(ans, k) {
    var c, m, pm, dd, j, r, B, divisible, z, zz, recSize;
    if (primes.length == 0) {
      primes = findPrimes(30000);
    }
    if (pows.length == 0) {
      pows = new Array(512);
      for (j = 0; j < 512; j++) {
        pows[j] = Math.pow(2, j / 511 - 1);
      }
    }
    c = 0.1;
    m = 20;
    recLimit = 20;
    if (s_i2.length != ans.length) {
      s_i2 = dup(ans);
      s_R = dup(ans);
      s_n1 = dup(ans);
      s_r2 = dup(ans);
      s_d = dup(ans);
      s_x1 = dup(ans);
      s_x2 = dup(ans);
      s_b = dup(ans);
      s_n = dup(ans);
      s_i = dup(ans);
      s_rm = dup(ans);
      s_q = dup(ans);
      s_a = dup(ans);
      s_aa = dup(ans);
    }
    if (k <= recLimit) {
      pm = (1 << ((k + 2) >> 1)) - 1;
      copyInt_(ans, 0);
      for (dd = 1; dd; ) {
        dd = 0;
        ans[0] =
          1 | (1 << (k - 1)) | Math.floor(adapterMathRandom() * (1 << k));
        for (j = 1; j < primes.length && (primes[j] & pm) == primes[j]; j++) {
          if (0 == ans[0] % primes[j]) {
            dd = 1;
            break;
          }
        }
      }
      carry_(ans);
      return;
    }
    B = c * k * k;
    if (k > 2 * m) {
      for (r = 1; k - k * r <= m; ) {
        r = pows[Math.floor(adapterMathRandom() * 512)];
      }
    } else {
      r = 0.5;
    }
    recSize = Math.floor(r * k) + 1;
    randTruePrime_(s_q, recSize);
    copyInt_(s_i2, 0);
    s_i2[Math.floor((k - 2) / bpe)] |= 1 << (k - 2) % bpe;
    divide_(s_i2, s_q, s_i, s_rm);
    z = bitSize(s_i);
    for (;;) {
      for (;;) {
        randBigInt_(s_R, z, 0);
        if (greater(s_i, s_R)) {
          break;
        }
      }
      addInt_(s_R, 1);
      add_(s_R, s_i);
      copy_(s_n, s_q);
      mult_(s_n, s_R);
      multInt_(s_n, 2);
      addInt_(s_n, 1);
      copy_(s_r2, s_R);
      multInt_(s_r2, 2);
      for (divisible = 0, j = 0; j < primes.length && primes[j] < B; j++) {
        if (modInt(s_n, primes[j]) == 0 && !equalsInt(s_n, primes[j])) {
          divisible = 1;
          break;
        }
      }
      if (!divisible) {
        if (!millerRabinInt(s_n, 2)) {
          divisible = 1;
        }
      }
      if (!divisible) {
        addInt_(s_n, -3);
        for (j = s_n.length - 1; s_n[j] == 0 && j > 0; j--) {}
        for (zz = 0, w = s_n[j]; w; w >>= 1, zz++) {}
        zz += bpe * j;
        for (;;) {
          randBigInt_(s_a, zz, 0);
          if (greater(s_n, s_a)) {
            break;
          }
        }
        addInt_(s_n, 3);
        addInt_(s_a, 2);
        copy_(s_b, s_a);
        copy_(s_n1, s_n);
        addInt_(s_n1, -1);
        powMod_(s_b, s_n1, s_n);
        addInt_(s_b, -1);
        if (isZero(s_b)) {
          copy_(s_b, s_a);
          powMod_(s_b, s_r2, s_n);
          addInt_(s_b, -1);
          copy_(s_aa, s_n);
          copy_(s_d, s_b);
          GCD_(s_d, s_n);
          if (equalsInt(s_d, 1)) {
            copy_(ans, s_aa);
            return;
          }
        }
      }
    }
  }
  function randBigInt(n, s) {
    var a, b;
    a = Math.floor((n - 1) / bpe) + 2;
    b = int2bigInt(0, 0, a);
    randBigInt_(b, n, s);
    return b;
  }
  function randBigInt_(b, n, s) {
    var i, a;
    for (i = 0; i < b.length; i++) {
      b[i] = 0;
    }
    a = Math.floor((n - 1) / bpe) + 1;
    for (i = 0; i < a; i++) {
      b[i] = Math.floor(adapterMathRandom() * (1 << (bpe - 1)));
    }
    b[a - 1] &= (2 << (n - 1) % bpe) - 1;
    if (s == 1) {
      b[a - 1] |= 1 << (n - 1) % bpe;
    }
  }
  function GCD(x, y) {
    var xc, yc;
    xc = dup(x);
    yc = dup(y);
    GCD_(xc, yc);
    return xc;
  }
  function GCD_(x, y) {
    var i, xp, yp, A, B, C, D, q, sing;
    if (T.length != x.length) {
      T = dup(x);
    }
    sing = 1;
    while (sing) {
      sing = 0;
      for (i = 1; i < y.length; i++) {
        if (y[i]) {
          sing = 1;
          break;
        }
      }
      if (!sing) {
        break;
      }
      for (i = x.length; !x[i] && i >= 0; i--) {}
      xp = x[i];
      yp = y[i];
      A = 1;
      B = 0;
      C = 0;
      D = 1;
      while (yp + C && yp + D) {
        q = Math.floor((xp + A) / (yp + C));
        qp = Math.floor((xp + B) / (yp + D));
        if (q != qp) {
          break;
        }
        t = A - q * C;
        A = C;
        C = t;
        t = B - q * D;
        B = D;
        D = t;
        t = xp - q * yp;
        xp = yp;
        yp = t;
      }
      if (B) {
        copy_(T, x);
        linComb_(x, y, A, B);
        linComb_(y, T, D, C);
      } else {
        mod_(x, y);
        copy_(T, x);
        copy_(x, y);
        copy_(y, T);
      }
    }
    if (y[0] == 0) {
      return;
    }
    t = modInt(x, y[0]);
    copyInt_(x, y[0]);
    y[0] = t;
    while (y[0]) {
      x[0] %= y[0];
      t = x[0];
      x[0] = y[0];
      y[0] = t;
    }
  }
  function inverseMod_(x, n) {
    var k = 1 + 2 * Math.max(x.length, n.length);
    if (!(x[0] & 1) && !(n[0] & 1)) {
      copyInt_(x, 0);
      return 0;
    }
    if (eg_u.length != k) {
      eg_u = new Array(k);
      eg_v = new Array(k);
      eg_A = new Array(k);
      eg_B = new Array(k);
      eg_C = new Array(k);
      eg_D = new Array(k);
    }
    copy_(eg_u, x);
    copy_(eg_v, n);
    copyInt_(eg_A, 1);
    copyInt_(eg_B, 0);
    copyInt_(eg_C, 0);
    copyInt_(eg_D, 1);
    for (;;) {
      while (!(eg_u[0] & 1)) {
        halve_(eg_u);
        if (!(eg_A[0] & 1) && !(eg_B[0] & 1)) {
          halve_(eg_A);
          halve_(eg_B);
        } else {
          add_(eg_A, n);
          halve_(eg_A);
          sub_(eg_B, x);
          halve_(eg_B);
        }
      }
      while (!(eg_v[0] & 1)) {
        halve_(eg_v);
        if (!(eg_C[0] & 1) && !(eg_D[0] & 1)) {
          halve_(eg_C);
          halve_(eg_D);
        } else {
          add_(eg_C, n);
          halve_(eg_C);
          sub_(eg_D, x);
          halve_(eg_D);
        }
      }
      if (!greater(eg_v, eg_u)) {
        sub_(eg_u, eg_v);
        sub_(eg_A, eg_C);
        sub_(eg_B, eg_D);
      } else {
        sub_(eg_v, eg_u);
        sub_(eg_C, eg_A);
        sub_(eg_D, eg_B);
      }
      if (equalsInt(eg_u, 0)) {
        if (negative(eg_C)) {
          add_(eg_C, n);
        }
        copy_(x, eg_C);
        if (!equalsInt(eg_v, 1)) {
          copyInt_(x, 0);
          return 0;
        }
        return 1;
      }
    }
  }
  function inverseModInt(x, n) {
    var a = 1,
      b = 0,
      t;
    for (;;) {
      if (x == 1) {
        return a;
      }
      if (x == 0) {
        return 0;
      }
      b -= a * Math.floor(n / x);
      n %= x;
      if (n == 1) {
        return b;
      }
      if (n == 0) {
        return 0;
      }
      a -= b * Math.floor(x / n);
      x %= n;
    }
  }
  function inverseModInt_(x, n) {
    return inverseModInt(x, n);
  }
  function eGCD_(x, y, v, a, b) {
    var g = 0;
    var k = Math.max(x.length, y.length);
    if (eg_u.length != k) {
      eg_u = new Array(k);
      eg_A = new Array(k);
      eg_B = new Array(k);
      eg_C = new Array(k);
      eg_D = new Array(k);
    }
    while (!(x[0] & 1) && !(y[0] & 1)) {
      halve_(x);
      halve_(y);
      g++;
    }
    copy_(eg_u, x);
    copy_(v, y);
    copyInt_(eg_A, 1);
    copyInt_(eg_B, 0);
    copyInt_(eg_C, 0);
    copyInt_(eg_D, 1);
    for (;;) {
      while (!(eg_u[0] & 1)) {
        halve_(eg_u);
        if (!(eg_A[0] & 1) && !(eg_B[0] & 1)) {
          halve_(eg_A);
          halve_(eg_B);
        } else {
          add_(eg_A, y);
          halve_(eg_A);
          sub_(eg_B, x);
          halve_(eg_B);
        }
      }
      while (!(v[0] & 1)) {
        halve_(v);
        if (!(eg_C[0] & 1) && !(eg_D[0] & 1)) {
          halve_(eg_C);
          halve_(eg_D);
        } else {
          add_(eg_C, y);
          halve_(eg_C);
          sub_(eg_D, x);
          halve_(eg_D);
        }
      }
      if (!greater(v, eg_u)) {
        sub_(eg_u, v);
        sub_(eg_A, eg_C);
        sub_(eg_B, eg_D);
      } else {
        sub_(v, eg_u);
        sub_(eg_C, eg_A);
        sub_(eg_D, eg_B);
      }
      if (equalsInt(eg_u, 0)) {
        if (negative(eg_C)) {
          add_(eg_C, y);
          sub_(eg_D, x);
        }
        multInt_(eg_D, -1);
        copy_(a, eg_C);
        copy_(b, eg_D);
        leftShift_(v, g);
        return;
      }
    }
  }
  function negative(x) {
    return (x[x.length - 1] >> (bpe - 1)) & 1;
  }
  function greaterShift(x, y, shift) {
    var i,
      kx = x.length,
      ky = y.length;
    k = kx + shift < ky ? kx + shift : ky;
    for (i = ky - 1 - shift; i < kx && i >= 0; i++) {
      if (x[i] > 0) {
        return 1;
      }
    }
    for (i = kx - 1 + shift; i < ky; i++) {
      if (y[i] > 0) {
        return 0;
      }
    }
    for (i = k - 1; i >= shift; i--) {
      if (x[i - shift] > y[i]) {
        return 1;
      } else {
        if (x[i - shift] < y[i]) {
          return 0;
        }
      }
    }
    return 0;
  }
  function greater(x, y) {
    var i;
    var k = x.length < y.length ? x.length : y.length;
    for (i = x.length; i < y.length; i++) {
      if (y[i]) {
        return 0;
      }
    }
    for (i = y.length; i < x.length; i++) {
      if (x[i]) {
        return 1;
      }
    }
    for (i = k - 1; i >= 0; i--) {
      if (x[i] > y[i]) {
        return 1;
      } else {
        if (x[i] < y[i]) {
          return 0;
        }
      }
    }
    return 0;
  }
  function divide_(x, y, q, r) {
    var kx, ky;
    var i, j, y1, y2, c, a, b;
    copy_(r, x);
    for (ky = y.length; y[ky - 1] == 0; ky--) {}
    b = y[ky - 1];
    for (a = 0; b; a++) {
      b >>= 1;
    }
    a = bpe - a;
    leftShift_(y, a);
    leftShift_(r, a);
    for (kx = r.length; r[kx - 1] == 0 && kx > ky; kx--) {}
    copyInt_(q, 0);
    while (!greaterShift(y, r, kx - ky)) {
      subShift_(r, y, kx - ky);
      q[kx - ky]++;
    }
    for (i = kx - 1; i >= ky; i--) {
      if (r[i] == y[ky - 1]) {
        q[i - ky] = mask;
      } else {
        q[i - ky] = Math.floor((r[i] * radix + r[i - 1]) / y[ky - 1]);
      }
      for (;;) {
        y2 = (ky > 1 ? y[ky - 2] : 0) * q[i - ky];
        c = y2 >> bpe;
        y2 = y2 & mask;
        y1 = c + q[i - ky] * y[ky - 1];
        c = y1 >> bpe;
        y1 = y1 & mask;
        if (
          c == r[i]
            ? y1 == r[i - 1]
              ? y2 > (i > 1 ? r[i - 2] : 0)
              : y1 > r[i - 1]
            : c > r[i]
        ) {
          q[i - ky]--;
        } else {
          break;
        }
      }
      linCombShift_(r, y, -q[i - ky], i - ky);
      if (negative(r)) {
        addShift_(r, y, i - ky);
        q[i - ky]--;
      }
    }
    rightShift_(y, a);
    rightShift_(r, a);
  }
  function carry_(x) {
    var i, k, c, b;
    k = x.length;
    c = 0;
    for (i = 0; i < k; i++) {
      c += x[i];
      b = 0;
      if (c < 0) {
        b = -(c >> bpe);
        c += b * radix;
      }
      x[i] = c & mask;
      c = (c >> bpe) - b;
    }
  }
  function modInt(x, n) {
    var i,
      c = 0;
    for (i = x.length - 1; i >= 0; i--) {
      c = (c * radix + x[i]) % n;
    }
    return c;
  }
  function int2bigInt(t, bits, minSize) {
    var i, k;
    k = Math.ceil(bits / bpe) + 1;
    k = minSize > k ? minSize : k;
    buff = new Array(k);
    copyInt_(buff, t);
    return buff;
  }
  function str2bigInt(s, base, minSize) {
    var d, i, j, x, y, kk;
    var k = s.length;
    if (base == -1) {
      x = new Array(0);
      for (;;) {
        y = new Array(x.length + 1);
        for (i = 0; i < x.length; i++) {
          y[i + 1] = x[i];
        }
        y[0] = parseInt(s, 10);
        x = y;
        d = s.indexOf(",", 0);
        if (d < 1) {
          break;
        }
        s = s.substring(d + 1);
        if (s.length == 0) {
          break;
        }
      }
      if (x.length < minSize) {
        y = new Array(minSize);
        copy_(y, x);
        return y;
      }
      return x;
    }
    x = int2bigInt(0, base * k, 0);
    for (i = 0; i < k; i++) {
      d = digitsStr.indexOf(s.substring(i, i + 1), 0);
      if (base <= 36 && d >= 36) {
        d -= 26;
      }
      if (d >= base || d < 0) {
        break;
      }
      multInt_(x, base);
      addInt_(x, d);
    }
    for (k = x.length; k > 0 && !x[k - 1]; k--) {}
    k = minSize > k + 1 ? minSize : k + 1;
    y = new Array(k);
    kk = k < x.length ? k : x.length;
    for (i = 0; i < kk; i++) {
      y[i] = x[i];
    }
    for (; i < k; i++) {
      y[i] = 0;
    }
    return y;
  }
  function equalsInt(x, y) {
    var i;
    if (x[0] != y) {
      return 0;
    }
    for (i = 1; i < x.length; i++) {
      if (x[i]) {
        return 0;
      }
    }
    return 1;
  }
  function equals(x, y) {
    var i;
    var k = x.length < y.length ? x.length : y.length;
    for (i = 0; i < k; i++) {
      if (x[i] != y[i]) {
        return 0;
      }
    }
    if (x.length > y.length) {
      for (; i < x.length; i++) {
        if (x[i]) {
          return 0;
        }
      }
    } else {
      for (; i < y.length; i++) {
        if (y[i]) {
          return 0;
        }
      }
    }
    return 1;
  }
  function isZero(x) {
    var i;
    for (i = 0; i < x.length; i++) {
      if (x[i]) {
        return 0;
      }
    }
    return 1;
  }
  function bigInt2str(x, base) {
    var i,
      t,
      s = "";
    if (s6.length != x.length) {
      s6 = dup(x);
    } else {
      copy_(s6, x);
    }
    if (base == -1) {
      for (i = x.length - 1; i > 0; i--) {
        s += x[i] + ",";
      }
      s += x[0];
    } else {
      while (!isZero(s6)) {
        t = divInt_(s6, base);
        s = digitsStr.substring(t, t + 1) + s;
      }
    }
    if (s.length == 0) {
      s = "0";
    }
    return s;
  }
  function dup(x) {
    var i;
    buff = new Array(x.length);
    copy_(buff, x);
    return buff;
  }
  function copy_(x, y) {
    var i;
    var k = x.length < y.length ? x.length : y.length;
    for (i = 0; i < k; i++) {
      x[i] = y[i];
    }
    for (i = k; i < x.length; i++) {
      x[i] = 0;
    }
  }
  function copyInt_(x, n) {
    var i, c;
    for (c = n, i = 0; i < x.length; i++) {
      x[i] = c & mask;
      c >>= bpe;
    }
  }
  function addInt_(x, n) {
    var i, k, c, b;
    x[0] += n;
    k = x.length;
    c = 0;
    for (i = 0; i < k; i++) {
      c += x[i];
      b = 0;
      if (c < 0) {
        b = -(c >> bpe);
        c += b * radix;
      }
      x[i] = c & mask;
      c = (c >> bpe) - b;
      if (!c) {
        return;
      }
    }
  }
  function rightShift_(x, n) {
    var i;
    var k = Math.floor(n / bpe);
    if (k) {
      for (i = 0; i < x.length - k; i++) {
        x[i] = x[i + k];
      }
      for (; i < x.length; i++) {
        x[i] = 0;
      }
      n %= bpe;
    }
    for (i = 0; i < x.length - 1; i++) {
      x[i] = mask & ((x[i + 1] << (bpe - n)) | (x[i] >> n));
    }
    x[i] >>= n;
  }
  function halve_(x) {
    var i;
    for (i = 0; i < x.length - 1; i++) {
      x[i] = mask & ((x[i + 1] << (bpe - 1)) | (x[i] >> 1));
    }
    x[i] = (x[i] >> 1) | (x[i] & (radix >> 1));
  }
  function leftShift_(x, n) {
    var i;
    var k = Math.floor(n / bpe);
    if (k) {
      for (i = x.length; i >= k; i--) {
        x[i] = x[i - k];
      }
      for (; i >= 0; i--) {
        x[i] = 0;
      }
      n %= bpe;
    }
    if (!n) {
      return;
    }
    for (i = x.length - 1; i > 0; i--) {
      x[i] = mask & ((x[i] << n) | (x[i - 1] >> (bpe - n)));
    }
    x[i] = mask & (x[i] << n);
  }
  function multInt_(x, n) {
    var i, k, c, b;
    if (!n) {
      return;
    }
    k = x.length;
    c = 0;
    for (i = 0; i < k; i++) {
      c += x[i] * n;
      b = 0;
      if (c < 0) {
        b = -(c >> bpe);
        c += b * radix;
      }
      x[i] = c & mask;
      c = (c >> bpe) - b;
    }
  }
  function divInt_(x, n) {
    var i,
      r = 0,
      s;
    for (i = x.length - 1; i >= 0; i--) {
      s = r * radix + x[i];
      x[i] = Math.floor(s / n);
      r = s % n;
    }
    return r;
  }
  function linComb_(x, y, a, b) {
    var i, c, k, kk;
    k = x.length < y.length ? x.length : y.length;
    kk = x.length;
    for (c = 0, i = 0; i < k; i++) {
      c += a * x[i] + b * y[i];
      x[i] = c & mask;
      c >>= bpe;
    }
    for (i = k; i < kk; i++) {
      c += a * x[i];
      x[i] = c & mask;
      c >>= bpe;
    }
  }
  function linCombShift_(x, y, b, ys) {
    var i, c, k, kk;
    k = x.length < ys + y.length ? x.length : ys + y.length;
    kk = x.length;
    for (c = 0, i = ys; i < k; i++) {
      c += x[i] + b * y[i - ys];
      x[i] = c & mask;
      c >>= bpe;
    }
    for (i = k; c && i < kk; i++) {
      c += x[i];
      x[i] = c & mask;
      c >>= bpe;
    }
  }
  function addShift_(x, y, ys) {
    var i, c, k, kk;
    k = x.length < ys + y.length ? x.length : ys + y.length;
    kk = x.length;
    for (c = 0, i = ys; i < k; i++) {
      c += x[i] + y[i - ys];
      x[i] = c & mask;
      c >>= bpe;
    }
    for (i = k; c && i < kk; i++) {
      c += x[i];
      x[i] = c & mask;
      c >>= bpe;
    }
  }
  function subShift_(x, y, ys) {
    var i, c, k, kk;
    k = x.length < ys + y.length ? x.length : ys + y.length;
    kk = x.length;
    for (c = 0, i = ys; i < k; i++) {
      c += x[i] - y[i - ys];
      x[i] = c & mask;
      c >>= bpe;
    }
    for (i = k; c && i < kk; i++) {
      c += x[i];
      x[i] = c & mask;
      c >>= bpe;
    }
  }
  function sub_(x, y) {
    var i, c, k, kk;
    k = x.length < y.length ? x.length : y.length;
    for (c = 0, i = 0; i < k; i++) {
      c += x[i] - y[i];
      x[i] = c & mask;
      c >>= bpe;
    }
    for (i = k; c && i < x.length; i++) {
      c += x[i];
      x[i] = c & mask;
      c >>= bpe;
    }
  }
  function add_(x, y) {
    var i, c, k, kk;
    k = x.length < y.length ? x.length : y.length;
    for (c = 0, i = 0; i < k; i++) {
      c += x[i] + y[i];
      x[i] = c & mask;
      c >>= bpe;
    }
    for (i = k; c && i < x.length; i++) {
      c += x[i];
      x[i] = c & mask;
      c >>= bpe;
    }
  }
  function mult_(x, y) {
    var i;
    if (ss.length != 2 * x.length) {
      ss = new Array(2 * x.length);
    }
    copyInt_(ss, 0);
    for (i = 0; i < y.length; i++) {
      if (y[i]) {
        linCombShift_(ss, x, y[i], i);
      }
    }
    copy_(x, ss);
  }
  function mod_(x, n) {
    if (s4.length != x.length) {
      s4 = dup(x);
    } else {
      copy_(s4, x);
    }
    if (s5.length != x.length) {
      s5 = dup(x);
    }
    divide_(s4, n, s5, x);
  }
  function multMod_(x, y, n) {
    var i;
    if (s0.length != 2 * x.length) {
      s0 = new Array(2 * x.length);
    }
    copyInt_(s0, 0);
    for (i = 0; i < y.length; i++) {
      if (y[i]) {
        linCombShift_(s0, x, y[i], i);
      }
    }
    mod_(s0, n);
    copy_(x, s0);
  }
  function squareMod_(x, n) {
    var i, j, d, c, kx, kn, k;
    for (kx = x.length; kx > 0 && !x[kx - 1]; kx--) {}
    k = kx > n.length ? 2 * kx : 2 * n.length;
    if (s0.length != k) {
      s0 = new Array(k);
    }
    copyInt_(s0, 0);
    for (i = 0; i < kx; i++) {
      c = s0[2 * i] + x[i] * x[i];
      s0[2 * i] = c & mask;
      c >>= bpe;
      for (j = i + 1; j < kx; j++) {
        c = s0[i + j] + 2 * x[i] * x[j] + c;
        s0[i + j] = c & mask;
        c >>= bpe;
      }
      s0[i + kx] = c;
    }
    mod_(s0, n);
    copy_(x, s0);
  }
  function trim(x, k) {
    var i, y;
    for (i = x.length; i > 0 && !x[i - 1]; i--) {}
    y = new Array(i + k);
    copy_(y, x);
    return y;
  }
  function powMod_(x, y, n) {
    var k1, k2, kn, np;
    if (s7.length != n.length) {
      s7 = dup(n);
    }
    if ((n[0] & 1) == 0) {
      copy_(s7, x);
      copyInt_(x, 1);
      while (!equalsInt(y, 0)) {
        if (y[0] & 1) {
          multMod_(x, s7, n);
        }
        divInt_(y, 2);
        squareMod_(s7, n);
      }
      return;
    }
    copyInt_(s7, 0);
    for (kn = n.length; kn > 0 && !n[kn - 1]; kn--) {}
    np = radix - inverseModInt(modInt(n, radix), radix);
    s7[kn] = 1;
    multMod_(x, s7, n);
    if (s3.length != x.length) {
      s3 = dup(x);
    } else {
      copy_(s3, x);
    }
    for (k1 = y.length - 1; (k1 > 0) & !y[k1]; k1--) {}
    if (y[k1] == 0) {
      copyInt_(x, 1);
      return;
    }
    for (k2 = 1 << (bpe - 1); k2 && !(y[k1] & k2); k2 >>= 1) {}
    for (;;) {
      if (!(k2 >>= 1)) {
        k1--;
        if (k1 < 0) {
          mont_(x, one, n, np);
          return;
        }
        k2 = 1 << (bpe - 1);
      }
      mont_(x, x, n, np);
      if (k2 & y[k1]) {
        mont_(x, s3, n, np);
      }
    }
  }
  function mont_(x, y, n, np) {
    var i, j, c, ui, t, ks;
    var kn = n.length;
    var ky = y.length;
    if (sa.length != kn) {
      sa = new Array(kn);
    }
    copyInt_(sa, 0);
    for (; kn > 0 && n[kn - 1] == 0; kn--) {}
    for (; ky > 0 && y[ky - 1] == 0; ky--) {}
    ks = sa.length - 1;
    for (i = 0; i < kn; i++) {
      t = sa[0] + x[i] * y[0];
      ui = ((t & mask) * np) & mask;
      c = (t + ui * n[0]) >> bpe;
      t = x[i];
      j = 1;
      for (; j < ky - 4; ) {
        c += sa[j] + ui * n[j] + t * y[j];
        sa[j - 1] = c & mask;
        c >>= bpe;
        j++;
        c += sa[j] + ui * n[j] + t * y[j];
        sa[j - 1] = c & mask;
        c >>= bpe;
        j++;
        c += sa[j] + ui * n[j] + t * y[j];
        sa[j - 1] = c & mask;
        c >>= bpe;
        j++;
        c += sa[j] + ui * n[j] + t * y[j];
        sa[j - 1] = c & mask;
        c >>= bpe;
        j++;
        c += sa[j] + ui * n[j] + t * y[j];
        sa[j - 1] = c & mask;
        c >>= bpe;
        j++;
      }
      for (; j < ky; ) {
        c += sa[j] + ui * n[j] + t * y[j];
        sa[j - 1] = c & mask;
        c >>= bpe;
        j++;
      }
      for (; j < kn - 4; ) {
        c += sa[j] + ui * n[j];
        sa[j - 1] = c & mask;
        c >>= bpe;
        j++;
        c += sa[j] + ui * n[j];
        sa[j - 1] = c & mask;
        c >>= bpe;
        j++;
        c += sa[j] + ui * n[j];
        sa[j - 1] = c & mask;
        c >>= bpe;
        j++;
        c += sa[j] + ui * n[j];
        sa[j - 1] = c & mask;
        c >>= bpe;
        j++;
        c += sa[j] + ui * n[j];
        sa[j - 1] = c & mask;
        c >>= bpe;
        j++;
      }
      for (; j < kn; ) {
        c += sa[j] + ui * n[j];
        sa[j - 1] = c & mask;
        c >>= bpe;
        j++;
      }
      for (; j < ks; ) {
        c += sa[j];
        sa[j - 1] = c & mask;
        c >>= bpe;
        j++;
      }
      sa[j - 1] = c & mask;
    }
    if (!greater(n, sa)) {
      sub_(sa, n);
    }
    copy_(x, sa);
  }
  var blowfish = (function (undefined) {
    var P = [
        608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832,
        137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300,
        3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731,
      ],
      S1 = [
        3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670,
        3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374,
        1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416,
        1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379,
        3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982,
        1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464,
        3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006,
        3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050,
        732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708,
        2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067,
        1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745,
        3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033,
        772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826,
        1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571,
        1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486,
        1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502,
        3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902,
        469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251,
        122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683,
        2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531,
        1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396,
        3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435,
        3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882,
        3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056,
        1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064,
        1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595,
        3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392,
        3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851,
        2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539,
        1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580,
        2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160,
        2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540,
        1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551,
        3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937,
        3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981,
        2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143,
        3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398,
        577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418,
        2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193,
        298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269,
        3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943,
        4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956,
        1404054877, 2845806497, 146425753, 1854211946,
      ],
      S2 = [
        1266315497, 3048417604, 3681880366, 3289982499, 2909710000, 1235738493,
        2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449,
        422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325,
        1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673,
        1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473,
        1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447,
        1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805,
        4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981,
        3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892,
        3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881,
        3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856,
        1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655,
        3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252,
        1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668,
        3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616,
        3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781,
        1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859,
        1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206,
        2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330,
        694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202,
        3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277,
        423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102,
        3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133,
        1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780,
        354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286,
        53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820,
        4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346,
        2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511,
        2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927,
        300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857,
        1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956,
        2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347,
        1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338,
        3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373,
        3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030,
        4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533,
        157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106,
        497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875,
        2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966,
        3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476,
        2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037,
        1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792,
        356393447, 2410691914, 3873677099, 3682840055,
      ],
      S3 = [
        3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079,
        3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287,
        507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711,
        1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444,
        2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812,
        170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054,
        1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612,
        3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499,
        499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714,
        1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951,
        1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544,
        3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748,
        4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314,
        1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167,
        845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280,
        3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701,
        1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857,
        3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200,
        1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100,
        980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669,
        3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507,
        3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355,
        3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081,
        2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300,
        1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866,
        1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610,
        1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518,
        1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100,
        2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756,
        1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170,
        1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788,
        2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396,
        3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297,
        1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264,
        448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134,
        2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375,
        2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320,
        6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572,
        3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056,
        963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620,
        3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352,
        2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119,
        3617206836, 2455994898, 1729034894, 1080033504,
      ],
      S4 = [
        976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578,
        3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283,
        3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217,
        3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814,
        691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906,
        1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820,
        2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233,
        1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353,
        2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191,
        753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344,
        530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254,
        1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136,
        2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250,
        60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426,
        457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805,
        55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263,
        1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142,
        1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792,
        2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957,
        1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891,
        3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579,
        2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400,
        1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388,
        886195818, 18198404, 3786409000, 2509781533, 112762804, 3463356488,
        1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036,
        3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993,
        3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674,
        3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343,
        4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370,
        261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801,
        3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347,
        1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142,
        453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566,
        3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879,
        370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899,
        2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580,
        3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322,
        1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758,
        1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379,
        950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296,
        2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436,
        29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231,
        3075367218, 3463963227, 1469046755, 985887462,
      ],
      p,
      s1,
      s2,
      s3,
      s4;
    function i2s(i) {
      return String.fromCharCode(
        (i >> 24) & 255,
        (i >> 16) & 255,
        (i >> 8) & 255,
        i & 255
      );
    }
    function s2i(s, j) {
      return (
        ((s.charCodeAt(j++) & 255) << 24) |
        ((s.charCodeAt(j++) & 255) << 16) |
        ((s.charCodeAt(j++) & 255) << 8) |
        (s.charCodeAt(j++) & 255)
      );
    }
    function xor(a, b) {
      return i2s(s2i(a, 0) ^ s2i(b, 0)) + i2s(s2i(a, 4) ^ s2i(b, 4));
    }
    function f(x) {
      return (
        (((s1[(x >> 24) & 255] + s2[(x >> 16) & 255]) ^ s3[(x >> 8) & 255]) +
          s4[x & 255]) ^
        0
      );
    }
    function encipher(x) {
      var i = 0,
        t,
        l = s2i(x, 0),
        r = s2i(x, 4);
      while (i < 16) {
        l ^= p[i++];
        r ^= f(l);
        t = l;
        l = r;
        r = t;
      }
      l ^= p[i++];
      r ^= p[i];
      return i2s(r) + i2s(l);
    }
    function decipher(x) {
      var i = 17,
        t,
        l = s2i(x, 0),
        r = s2i(x, 4);
      while (i > 1) {
        l ^= p[i--];
        r ^= f(l);
        t = l;
        l = r;
        r = t;
      }
      l ^= p[i--];
      r ^= p[i];
      return i2s(r) + i2s(l);
    }
    function subkey(k) {
      var i,
        x = "\0\0\0\0\0\0\0\0";
      p = P.slice();
      s1 = S1.slice();
      s2 = S2.slice();
      s3 = S3.slice();
      s4 = S4.slice();
      while (k.length < 72) {
        k += k;
      }
      i = 0;
      while (i < 18) {
        p[i] ^= s2i(k, i << 2);
        i++;
      }
      i = 0;
      while (i < 18) {
        x = encipher(x);
        p[i++] = s2i(x, 0);
        p[i++] = s2i(x, 4);
      }
      i = 0;
      while (i < 256) {
        x = encipher(x);
        s1[i++] = s2i(x, 0);
        s1[i++] = s2i(x, 4);
      }
      i = 0;
      while (i < 256) {
        x = encipher(x);
        s2[i++] = s2i(x, 0);
        s2[i++] = s2i(x, 4);
      }
      i = 0;
      while (i < 256) {
        x = encipher(x);
        s3[i++] = s2i(x, 0);
        s3[i++] = s2i(x, 4);
      }
      i = 0;
      while (i < 256) {
        x = encipher(x);
        s4[i++] = s2i(x, 0);
        s4[i++] = s2i(x, 4);
      }
    }
    function utf8(s) {
      var i = 0,
        l = s.length,
        x = String.fromCharCode,
        c,
        r = [];
      while (i < l) {
        c = s.charCodeAt(i++);
        if (c < 128) {
          r.push(x(c));
        } else {
          if (c < 2048) {
            r.push(x(((c >> 6) & 31) | 192, (c & 63) | 128));
          } else {
            if (c < 65536) {
              r.push(
                x(((c >> 12) & 15) | 224, ((c >> 6) & 63) | 128, (c & 63) | 128)
              );
            } else {
              if (c < 2097152) {
                r.push(
                  x(
                    ((c >> 18) & 7) | 240,
                    ((c >> 12) & 63) | 128,
                    ((c >> 6) & 63) | 128,
                    (c & 63) | 128
                  )
                );
              } else {
              }
            }
          }
        }
      }
      return r.join("");
    }
    function utf16(s) {
      var i = 0,
        l = s.length,
        x = String.fromCharCode,
        c,
        r = [];
      while (i < l) {
        c = s.charCodeAt(i++);
        if ((c & 128) == 0) {
          r.push(x(c & 255));
        } else {
          if ((c & 224) == 192) {
            if (i < l) {
              r.push(x(((c << 6) & 1984) | (s.charCodeAt(i++) & 63)));
            }
          } else {
            if ((c & 240) == 224) {
              if (i + 1 < l) {
                r.push(
                  x(
                    ((c << 12) & 61440) |
                      ((s.charCodeAt(i++) << 6) & 4032) |
                      (s.charCodeAt(i++) & 63)
                  )
                );
              }
            } else {
              if ((c & 248) == 240) {
                if (i + 2 < l) {
                  r.push(
                    x(
                      ((c << 18) & 1835008) |
                        ((s.charCodeAt(i++) << 12) & 258048) |
                        ((s.charCodeAt(i++) << 6) & 4032) |
                        (s.charCodeAt(i++) & 63)
                    )
                  );
                }
              } else {
              }
            }
          }
        }
      }
      return r.join("");
    }
    return {
      encrypt: function (param) {
        var i,
          c,
          v,
          block = [],
          data = param.data || "",
          key = param.key || "\0",
          mode = param.mode || "ecb",
          pchar = param.pchar || "\x05";
        subkey(key);
        data = utf8(data);
        data += new Array(((8 - (data.length % 8)) % 8) + 1).join(pchar);
        if (mode == "cbc") {
          v = param.iv || "\0\0\0\0\0\0\0\0";
          block.push(v);
          i = 0;
          while (i < data.length) {
            c = encipher(xor(data.substr(i, 8), v));
            block.push(c);
            v = c;
            i += 8;
          }
        } else {
          i = 0;
          while (i < data.length) {
            block.push(encipher(data.substr(i, 8)));
            i += 8;
          }
        }
        return block.join("");
      },
      decrypt: function (param) {
        var i,
          c,
          v,
          block = [],
          data = param.data || "",
          key = param.key || "\0",
          mode = param.mode || "ecb",
          pchar = param.pchar || "\x05";
        subkey(key);
        data += new Array(((8 - (data.length % 8)) % 8) + 1).join("\0");
        if (mode == "cbc") {
          v = data.substr(0, 8) || "\0\0\0\0\0\0\0\0";
          i = 8;
          while (i < data.length) {
            c = data.substr(i, 8);
            block.push(xor(decipher(c), v));
            v = c;
            i += 8;
          }
        } else {
          i = 0;
          while (i < data.length) {
            block.push(decipher(data.substr(i, 8)));
            i += 8;
          }
        }
        data = block.join("").replace(new RegExp(pchar + "+$"), "");
        return utf16(data);
      },
      mkIV: function () {
        function adapterMathRandom() {
          var crypto = window.crypto || window.msCrypto;
          var rand;
          try {
            rand = crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
          } catch (e) {
            // console.log("GetRandomValues is not supported on your browser");
          }
          return rand;
        }
        return (
          i2s(adapterMathRandom() * 4294967296) +
          i2s(adapterMathRandom() * 4294967296)
        );
      },
    };
  })();
  var md5 = (function (undefined) {
    var s = [
        7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14,
        20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16,
        23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10,
        15, 21, 6, 10, 15, 21,
      ],
      k = [
        3614090360, 3905402710, 606105819, 3250441966, 4118548399, 1200080426,
        2821735955, 4249261313, 1770035416, 2336552879, 4294925233, 2304563134,
        1804603682, 4254626195, 2792965006, 1236535329, 4129170786, 3225465664,
        643717713, 3921069994, 3593408605, 38016083, 3634488961, 3889429448,
        568446438, 3275163606, 4107603335, 1163531501, 2850285829, 4243563512,
        1735328473, 2368359562, 4294588738, 2272392833, 1839030562, 4259657740,
        2763975236, 1272893353, 4139469664, 3200236656, 681279174, 3936430074,
        3572445317, 76029189, 3654602809, 3873151461, 530742520, 3299628645,
        4096336452, 1126891415, 2878612391, 4237533241, 1700485571, 2399980690,
        4293915773, 2240044497, 1873313359, 4264355552, 2734768916, 1309151649,
        4149444226, 3174756917, 718787259, 3951481745,
      ],
      p = "\x80" + new Array(64).join("\0");
    function i2s(i) {
      return String.fromCharCode(
        i & 255,
        (i >> 8) & 255,
        (i >> 16) & 255,
        (i >> 24) & 255
      );
    }
    function s2i(s, j) {
      return (
        (s.charCodeAt(j++) & 255) |
        ((s.charCodeAt(j++) & 255) << 8) |
        ((s.charCodeAt(j++) & 255) << 16) |
        (s.charCodeAt(j++) << 24)
      );
    }
    return {
      bin: function (data) {
        var a0 = 1732584193,
          b0 = 4023233417,
          c0 = 2562383102,
          d0 = 271733878,
          a,
          b,
          c,
          d,
          f,
          g,
          r,
          i,
          j,
          m = new Array(16);
        data +=
          p.slice(0, 64 - ((data.length + 8) % 64)) +
          i2s(data.length << 3) +
          i2s(0);
        for (i = 0; i < data.length; i += 64) {
          for (j = 0; j < 16; j++) {
            m[j] = s2i(data, i + (j << 2));
          }
          a = a0;
          b = b0;
          c = c0;
          d = d0;
          for (j = 0; j < 64; j++) {
            if (j < 16) {
              f = (b & c) | (~b & d);
              g = j;
            } else {
              if (j < 32) {
                f = (d & b) | (~d & c);
                g = (j * 5 + 1) & 15;
              } else {
                if (j < 48) {
                  f = b ^ c ^ d;
                  g = (j * 3 + 5) & 15;
                } else {
                  f = c ^ (b | ~d);
                  g = (j * 7) & 15;
                }
              }
            }
            r = (a + f + k[j] + m[g]) | 0;
            r = (r << s[j]) | (r >>> (32 - s[j]));
            a = d;
            d = c;
            c = b;
            b = (r + b) | 0;
          }
          a0 = (a0 + a) | 0;
          b0 = (b0 + b) | 0;
          c0 = (c0 + c) | 0;
          d0 = (d0 + d) | 0;
        }
        return i2s(a0) + i2s(b0) + i2s(c0) + i2s(d0);
      },
    };
  })();
  (function () {
    var l = void 0,
      aa = this;
    function r(c, d) {
      var a = c.split("."),
        b = aa;
      !(a[0] in b) && b.execScript && b.execScript("var " + a[0]);
      for (var e; a.length && (e = a.shift()); ) {
        !a.length && d !== l ? (b[e] = d) : (b = b[e] ? b[e] : (b[e] = {}));
      }
    }
    var t =
      "undefined" !== typeof Uint8Array &&
      "undefined" !== typeof Uint16Array &&
      "undefined" !== typeof Uint32Array &&
      "undefined" !== typeof DataView;
    function v(c) {
      var d = c.length,
        a = 0,
        b = Number.POSITIVE_INFINITY,
        e,
        f,
        g,
        h,
        k,
        m,
        n,
        p,
        s,
        x;
      for (p = 0; p < d; ++p) {
        c[p] > a && (a = c[p]), c[p] < b && (b = c[p]);
      }
      e = 1 << a;
      f = new (t ? Uint32Array : Array)(e);
      g = 1;
      h = 0;
      for (k = 2; g <= a; ) {
        for (p = 0; p < d; ++p) {
          if (c[p] === g) {
            m = 0;
            n = h;
            for (s = 0; s < g; ++s) {
              (m = (m << 1) | (n & 1)), (n >>= 1);
            }
            x = (g << 16) | p;
            for (s = m; s < e; s += k) {
              f[s] = x;
            }
            ++h;
          }
        }
        ++g;
        h <<= 1;
        k <<= 1;
      }
      return [f, a, b];
    }
    function w(c, d) {
      this.g = [];
      this.h = 32768;
      this.d = this.f = this.a = this.l = 0;
      this.input = t ? new Uint8Array(c) : c;
      this.m = !1;
      this.i = y;
      this.r = !1;
      if (d || !(d = {})) {
        d.index && (this.a = d.index),
          d.bufferSize && (this.h = d.bufferSize),
          d.bufferType && (this.i = d.bufferType),
          d.resize && (this.r = d.resize);
      }
      switch (this.i) {
        case A:
          this.b = 32768;
          this.c = new (t ? Uint8Array : Array)(32768 + this.h + 258);
          break;
        case y:
          this.b = 0;
          this.c = new (t ? Uint8Array : Array)(this.h);
          this.e = this.z;
          this.n = this.v;
          this.j = this.w;
          break;
        default:
          throw Error("invalid inflate mode");
      }
    }
    var A = 0,
      y = 1,
      B = { t: A, s: y };
    w.prototype.k = function () {
      for (; !this.m; ) {
        var c = C(this, 3);
        c & 1 && (this.m = !0);
        c >>>= 1;
        switch (c) {
          case 0:
            var d = this.input,
              a = this.a,
              b = this.c,
              e = this.b,
              f = d.length,
              g = l,
              h = l,
              k = b.length,
              m = l;
            this.d = this.f = 0;
            if (a + 1 >= f) {
              throw Error("invalid uncompressed block header: LEN");
            }
            g = d[a++] | (d[a++] << 8);
            if (a + 1 >= f) {
              throw Error("invalid uncompressed block header: NLEN");
            }
            h = d[a++] | (d[a++] << 8);
            if (g === ~h) {
              throw Error("invalid uncompressed block header: length verify");
            }
            if (a + g > d.length) {
              throw Error("input buffer is broken");
            }
            switch (this.i) {
              case A:
                for (; e + g > b.length; ) {
                  m = k - e;
                  g -= m;
                  if (t) {
                    b.set(d.subarray(a, a + m), e), (e += m), (a += m);
                  } else {
                    for (; m--; ) {
                      b[e++] = d[a++];
                    }
                  }
                  this.b = e;
                  b = this.e();
                  e = this.b;
                }
                break;
              case y:
                for (; e + g > b.length; ) {
                  b = this.e({ p: 2 });
                }
                break;
              default:
                throw Error("invalid inflate mode");
            }
            if (t) {
              b.set(d.subarray(a, a + g), e), (e += g), (a += g);
            } else {
              for (; g--; ) {
                b[e++] = d[a++];
              }
            }
            this.a = a;
            this.b = e;
            this.c = b;
            break;
          case 1:
            this.j(ba, ca);
            break;
          case 2:
            for (
              var n = C(this, 5) + 257,
                p = C(this, 5) + 1,
                s = C(this, 4) + 4,
                x = new (t ? Uint8Array : Array)(D.length),
                S = l,
                T = l,
                U = l,
                u = l,
                M = l,
                F = l,
                z = l,
                q = l,
                V = l,
                q = 0;
              q < s;
              ++q
            ) {
              x[D[q]] = C(this, 3);
            }
            if (!t) {
              q = s;
              for (s = x.length; q < s; ++q) {
                x[D[q]] = 0;
              }
            }
            S = v(x);
            u = new (t ? Uint8Array : Array)(n + p);
            q = 0;
            for (V = n + p; q < V; ) {
              switch (((M = E(this, S)), M)) {
                case 16:
                  for (z = 3 + C(this, 2); z--; ) {
                    u[q++] = F;
                  }
                  break;
                case 17:
                  for (z = 3 + C(this, 3); z--; ) {
                    u[q++] = 0;
                  }
                  F = 0;
                  break;
                case 18:
                  for (z = 11 + C(this, 7); z--; ) {
                    u[q++] = 0;
                  }
                  F = 0;
                  break;
                default:
                  F = u[q++] = M;
              }
            }
            T = t ? v(u.subarray(0, n)) : v(u.slice(0, n));
            U = t ? v(u.subarray(n)) : v(u.slice(n));
            this.j(T, U);
            break;
          default:
            throw Error("unknown BTYPE: " + c);
        }
      }
      return this.n();
    };
    var G = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
      D = t ? new Uint16Array(G) : G,
      H = [
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
        67, 83, 99, 115, 131, 163, 195, 227, 258, 258, 258,
      ],
      I = t ? new Uint16Array(H) : H,
      J = [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4,
        5, 5, 5, 5, 0, 0, 0,
      ],
      K = t ? new Uint8Array(J) : J,
      L = [
        1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385,
        513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
      ],
      da = t ? new Uint16Array(L) : L,
      ea = [
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
        10, 11, 11, 12, 12, 13, 13,
      ],
      N = t ? new Uint8Array(ea) : ea,
      O = new (t ? Uint8Array : Array)(288),
      P,
      fa;
    P = 0;
    for (fa = O.length; P < fa; ++P) {
      O[P] = 143 >= P ? 8 : 255 >= P ? 9 : 279 >= P ? 7 : 8;
    }
    var ba = v(O),
      Q = new (t ? Uint8Array : Array)(30),
      R,
      ga;
    R = 0;
    for (ga = Q.length; R < ga; ++R) {
      Q[R] = 5;
    }
    var ca = v(Q);
    function C(c, d) {
      for (
        var a = c.f, b = c.d, e = c.input, f = c.a, g = e.length, h;
        b < d;

      ) {
        if (f >= g) {
          throw Error("input buffer is broken");
        }
        a |= e[f++] << b;
        b += 8;
      }
      h = a & ((1 << d) - 1);
      c.f = a >>> d;
      c.d = b - d;
      c.a = f;
      return h;
    }
    function E(c, d) {
      for (
        var a = c.f,
          b = c.d,
          e = c.input,
          f = c.a,
          g = e.length,
          h = d[0],
          k = d[1],
          m,
          n;
        b < k && !(f >= g);

      ) {
        (a |= e[f++] << b), (b += 8);
      }
      m = h[a & ((1 << k) - 1)];
      n = m >>> 16;
      if (n > b) {
        throw Error("invalid code length: " + n);
      }
      c.f = a >> n;
      c.d = b - n;
      c.a = f;
      return m & 65535;
    }
    w.prototype.j = function (c, d) {
      var a = this.c,
        b = this.b;
      this.o = c;
      for (var e = a.length - 258, f, g, h, k; 256 !== (f = E(this, c)); ) {
        if (256 > f) {
          b >= e && ((this.b = b), (a = this.e()), (b = this.b)), (a[b++] = f);
        } else {
          g = f - 257;
          k = I[g];
          0 < K[g] && (k += C(this, K[g]));
          f = E(this, d);
          h = da[f];
          0 < N[f] && (h += C(this, N[f]));
          b >= e && ((this.b = b), (a = this.e()), (b = this.b));
          for (; k--; ) {
            a[b] = a[b++ - h];
          }
        }
      }
      for (; 8 <= this.d; ) {
        (this.d -= 8), this.a--;
      }
      this.b = b;
    };
    w.prototype.w = function (c, d) {
      var a = this.c,
        b = this.b;
      this.o = c;
      for (var e = a.length, f, g, h, k; 256 !== (f = E(this, c)); ) {
        if (256 > f) {
          b >= e && ((a = this.e()), (e = a.length)), (a[b++] = f);
        } else {
          g = f - 257;
          k = I[g];
          0 < K[g] && (k += C(this, K[g]));
          f = E(this, d);
          h = da[f];
          0 < N[f] && (h += C(this, N[f]));
          b + k > e && ((a = this.e()), (e = a.length));
          for (; k--; ) {
            a[b] = a[b++ - h];
          }
        }
      }
      for (; 8 <= this.d; ) {
        (this.d -= 8), this.a--;
      }
      this.b = b;
    };
    w.prototype.e = function () {
      var c = new (t ? Uint8Array : Array)(this.b - 32768),
        d = this.b - 32768,
        a,
        b,
        e = this.c;
      if (t) {
        c.set(e.subarray(32768, c.length));
      } else {
        a = 0;
        for (b = c.length; a < b; ++a) {
          c[a] = e[a + 32768];
        }
      }
      this.g.push(c);
      this.l += c.length;
      if (t) {
        e.set(e.subarray(d, d + 32768));
      } else {
        for (a = 0; 32768 > a; ++a) {
          e[a] = e[d + a];
        }
      }
      this.b = 32768;
      return e;
    };
    w.prototype.z = function (c) {
      var d,
        a = (this.input.length / this.a + 1) | 0,
        b,
        e,
        f,
        g = this.input,
        h = this.c;
      c &&
        ("number" === typeof c.p && (a = c.p),
        "number" === typeof c.u && (a += c.u));
      2 > a
        ? ((b = (g.length - this.a) / this.o[2]),
          (f = (258 * (b / 2)) | 0),
          (e = f < h.length ? h.length + f : h.length << 1))
        : (e = h.length * a);
      t ? ((d = new Uint8Array(e)), d.set(h)) : (d = h);
      return (this.c = d);
    };
    w.prototype.n = function () {
      var c = 0,
        d = this.c,
        a = this.g,
        b,
        e = new (t ? Uint8Array : Array)(this.l + (this.b - 32768)),
        f,
        g,
        h,
        k;
      if (0 === a.length) {
        return t ? this.c.subarray(32768, this.b) : this.c.slice(32768, this.b);
      }
      f = 0;
      for (g = a.length; f < g; ++f) {
        b = a[f];
        h = 0;
        for (k = b.length; h < k; ++h) {
          e[c++] = b[h];
        }
      }
      f = 32768;
      for (g = this.b; f < g; ++f) {
        e[c++] = d[f];
      }
      this.g = [];
      return (this.buffer = e);
    };
    w.prototype.v = function () {
      var c,
        d = this.b;
      t
        ? this.r
          ? ((c = new Uint8Array(d)), c.set(this.c.subarray(0, d)))
          : (c = this.c.subarray(0, d))
        : (this.c.length > d && (this.c.length = d), (c = this.c));
      return (this.buffer = c);
    };
    function W(c, d) {
      var a, b;
      this.input = c;
      this.a = 0;
      if (d || !(d = {})) {
        d.index && (this.a = d.index), d.verify && (this.A = d.verify);
      }
      a = c[this.a++];
      b = c[this.a++];
      switch (a & 15) {
        case ha:
          this.method = ha;
          break;
        default:
          throw Error("unsupported compression method");
      }
      if (0 !== ((a << 8) + b) % 31) {
        throw Error("invalid fcheck flag:" + (((a << 8) + b) % 31));
      }
      if (b & 32) {
        throw Error("fdict flag is not supported");
      }
      this.q = new w(c, {
        index: this.a,
        bufferSize: d.bufferSize,
        bufferType: d.bufferType,
        resize: d.resize,
      });
    }
    W.prototype.k = function () {
      var c = this.input,
        d,
        a;
      d = this.q.k();
      this.a = this.q.a;
      if (this.A) {
        a =
          ((c[this.a++] << 24) |
            (c[this.a++] << 16) |
            (c[this.a++] << 8) |
            c[this.a++]) >>>
          0;
        var b = d;
        if ("string" === typeof b) {
          var e = b.split(""),
            f,
            g;
          f = 0;
          for (g = e.length; f < g; f++) {
            e[f] = (e[f].charCodeAt(0) & 255) >>> 0;
          }
          b = e;
        }
        for (var h = 1, k = 0, m = b.length, n, p = 0; 0 < m; ) {
          n = 1024 < m ? 1024 : m;
          m -= n;
          do {
            (h += b[p++]), (k += h);
          } while (--n);
          h %= 65521;
          k %= 65521;
        }
        if (a !== ((k << 16) | h) >>> 0) {
          throw Error("invalid adler-32 checksum");
        }
      }
      return d;
    };
    var ha = 8;
    r("Zlib.Inflate", W);
    r("Zlib.Inflate.prototype.decompress", W.prototype.k);
    var X = { ADAPTIVE: B.s, BLOCK: B.t },
      Y,
      Z,
      $,
      ia;
    if (Object.keys) {
      Y = Object.keys(X);
    } else {
      for (Z in ((Y = []), ($ = 0), X)) {
        Y[$++] = Z;
      }
    }
    $ = 0;
    for (ia = Y.length; $ < ia; ++$) {
      (Z = Y[$]), r("Zlib.Inflate.BufferType." + Z, X[Z]);
    }
  }).call(this);
  if (!window.epson) {
    window.epson = {};
  }
  window.epson.ePOSDevice = ePOSDevice;
  window.epson.ePOSDeviceConfiguration = ePOSDeviceConfiguration;
})(window);
