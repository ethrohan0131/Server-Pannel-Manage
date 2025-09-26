// Mock data for server panels
export const serverPanels = {
  R1: {
    id: "R1",
    name: "Server Panel R1",
    panelIp: "92.119.177.24",
    username: "corinnaburfeindt11",
    password: "0Huu<78UJ`_VV",
    twoFaCode: "4LW6MS3DN3GK3USS",
    oneTimeCode: "lochy-prime-yill-mafic"
  },
  R2: {
    id: "R2", 
    name: "Server Panel R2",
    panelIp: "92.119.177.20",
    username: "RueiroeWowor", 
    password: "0vK0h#tX1hP+%",
    twoFaCode: "BZGRHAE7XN6C2RK6",
    oneTimeCode: "jabul-spire-oftly-sheaf"
  },
  R3: {
    id: "R3",
    name: "Server Panel R3", 
    panelIp: "193.148.18.54",
    username: "masahiro_ito-163",
    password: "AA40221aa###",
    twoFaCode: "A4HRNRUUZU4TLOFB", 
    oneTimeCode: "ruru-upbuy-bier-hizz"
  }
};

export const getPanelOptions = () => {
  return Object.keys(serverPanels).map(key => ({
    value: key,
    label: serverPanels[key].name
  }));
};

export const getPanelById = (id) => {
  return serverPanels[id] || null;
};