type ROLE_MAP_TYPE = {
  [key: string]: string[];
};

const ROLE_MAP: ROLE_MAP_TYPE = {
  dev: ["*"],
};

function checkRoleMap(role: string, route: string) {
  const routes = ROLE_MAP[role];
  if (routes.includes("*")) {
    return true;
  }

  if (routes.includes(route)) {
    return true;
  }

  return false;
}

export async function canAccess(role: string, route: string) {
  console.log(role);
  if (role) return checkRoleMap(role, route);
  return false;
}
