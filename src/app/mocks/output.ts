const output = {
  "Contact": {
    "PrintAs": "$.fullName",
    "FirstName": "$.firstName",
    "LastName": "$.lastName",
    "PrimaryEmailAddress": "$.additionalFields[?(@.source=='fHCM2__Email__c')].value"
  },
  "Employee": {
    "LocationId": "$.additionalFields[?(@.source=='Finance_Dept_Mapping__c')].value",
    "Ssn": "$.additionalFields[?(@.source=='NI_or_SS_Number__c')].value",
    "StartDate": "$.currentEmployment.startDate",
    "Title": "currentEmployment.jobTitle",
    "EmployeeType": "$.additionalFields[?(@.source=='fHCM2__Current_Employment__r.fHCM2__Basis__c')].value",
    "Gender": "$.additionalFields[?(@.source=='fHCM2__Gender__c')].value",
    "BirthDate": "$.additionalFields[?(@.source=='fHCM2__Birth_Date__c')].value",
    "ManagerEmployeeId": "$.additionalFields[?(@.source=='fHCM2__Manager__c')].value",
    "PreferredPaymentMethod": "$.additionalFields[?(@.source=='Payment_Method__c')].value",
    "AchEnabled": "$.additionalFields[?(@.source=='ACH_Enabled__c')].value",
    "AchBankAccountNo": "$.additionalFields[?(@.source=='fHCM2__Current_Employment__r.fHCM2__Account_No__c')].value",
    "AchBankRoutingNo": "$.additionalFields[?(@.source=='fHCM2__Current_Employment__r.fHCM2__Sort_Code__c')].value"
  }
}
