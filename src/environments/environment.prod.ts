export const environment = {
  srp_microservice_url: "https://evd.srp.cloud.slb-ds.com/api/",
  // srp_microservice_url: "http://localhost:5000/api/",
  customAlertNotification:['Text','Email'],
  customAlertPriority:['High','Medium','Low'],
  customAlertCategory:['Fluid Pound Events','Gas Interference Events','Flatlining Events','Tagging Events','Distorted Card Events','Current SPM','Current PF','Load','Shutdowns','Runtime Yesterday'],
  customAlertOperator:['=','<>','>','>=','<','<='],
  customAlertValue:['Any numerical value','Max Allowable SPM Setpoint','Min Allowable SPM Setpoint','Max load','Min load','Max Allowable Shutdowns','Min Runtime'],
  pageSizeOption:[10,20,30],
  redirectUri: 'https://evd.srp.cloud.slb-ds.com/Callback',
  authorizationUrl: 'https://p4d.csi.cloud.slb-ds.com/v2/auth?',
  tokenUrl: 'https://p4d.csi.cloud.slb-ds.com/v2/token',
  clientId: 'd20825d2c17efc0b42908d0078b78eab'
}