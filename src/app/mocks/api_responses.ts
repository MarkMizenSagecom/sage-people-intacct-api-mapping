import * as fromModels from '../models';

export const exampleIntacctRepsonse: fromModels.SageIntactApiSchema = {
  version: '',
  date: '',
  data: {
    "Contact": {
      label: 'Contact',
      type: 'object',
      length: 3,
      data:{
        "PrintAs": {
          label: 'PrintAs',
          type: 'string',
          length: 255
        },
        "FirstName": {
          label: 'FirstName',
          type: 'string',
          length: 255
        },
        "LastName": {
          label: 'LastName',
          type: 'string',
          length: 255
        }
      }
    },
    "Employee":{
      type: 'object',
      label: "Employee",
      length: 12,
      data: {
        "LocationId": {
          label: "LocationId",
          type: 'string',
          length: 25,
        },
        "Ssn": {
          label: "Ssn",
          type: 'string',
          length: 20,
        },
        "StartDate": {
          label: "StartDate",
          type: 'date',
        },
        "Title": {
          label: "Title",
          type: 'string',
          length: 255,
        },
        "EmployeeType": {
          label: "EmployeeType",
          type: 'string',
          length: 20,
        },
        "Gender": {
          label: "Gender",
          type: 'string',
          length: 12,
        },
        "BirthDate": {
          label: "BirthDate",
          type: 'string',
        },
        "ManagerEmployeeId": {
          label: "ManagerEmployeeId",
          type: 'string',
          length: 255,
        },
        "AchEnabled": {
          label: "AchEnabled",
          type: 'boolean',
        },
        "AchBankAccountNo": {
          label: "AchBankAccountNo",
          type: 'string',
          length: 30,
        },
        "AchBankRoutingNo": {
          label: "AchBankRoutingNo",
          type: 'string',
          length: 30,
        }
      }
    }
  }
};


export const examplePeopleRepsonse: fromModels.SagePeopleApiSchema = {
  version: '',
  date: '',
  data: {
    'id': {
      label: 'id',
      type: 'string',
      length: 18,
    },
    "hrDepartment": {
      type: 'string',
      label: 'hrDepartment',
      length: 255
    },
    "fullName": {
      type: 'string',
      label: 'fullName',
      length: 255
    },
    "firstName": {
      type: 'string',
      label: 'firstName',
      length: 255
    },
    "lastName": {
      type: 'string',
      label: 'lastName',
      length: 255
    },
    "emailAddress": {
      type: 'string',
      label: 'emailAddress',
      length: 255
    },
    "currentEmployment": {
      label: 'currentEmployment',
      type: 'object',
      length: 5,
      data: {
        "startDate": {
          label: 'startDate',
          type: "date",
          length: 10
        },
        "name": {
          label: 'name',
          type: "string",
          length: 10
        },
        "jobTitle": {
          label: 'jobTitle',
          type: "string",
          length: 255,
        },
        "endDate": {
          label: 'endDate',
          type: "date",
          length: 10,
        },
        "active": {
          label: 'active',
          type: 'boolean',
          length: 10
        }
      }
    },
    "additionalFields": {
      label: 'additionalFields',
      type: 'array',
      length: 1,
      data: [
        {
          label: "Age",
          type: "number",
          length: 3,
          source: "fHCM2__Age__c"
        }
      ]
    }
  }
};

