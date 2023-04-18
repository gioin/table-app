export const adminPermissions: any = {
  permissions: {
    group1: {
      permission1: true,
      permission2: true
    },
    group2: {
      permission3: true,
      permission4: true
    },
    group3: {
      permission5: true,
      permission6: true
    }
  },
  status: true
};
export const userPermissions: any = {
  permissions: {
    group1: {
      permission1: true,
      permission2: false
    },
    group2: {
      permission3: true,
      permission4: false
    },
    group3: {
      permission5: true,
      permission6: false
    }
  },
  status: true
};

export const roles = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" }
];



export const recordOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" }
];