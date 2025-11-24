import { defineAbility } from '@casl/ability';
  export default (user) => defineAbility((can) => {
    user.roles.forEach(roleName => {
      can(roleName);
    })
  });