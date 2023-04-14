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
