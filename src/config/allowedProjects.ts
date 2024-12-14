interface IAllowedProject {
  name: string;
  id: string;
  to?: string;
  bulkTo?: string[];
  subject?: string;
  html?: string;
  text?: string;
}
export const allowedProjects: IAllowedProject[] = [
  {
    name: 'martinkolesnikov.cz',
    id: "11637dd6-5c1f-4cf5-8664-188fee03826b",
    to: "tomasborek3@gmail.com",
    subject: "Nová zpráva z kontaktního formuláře na martinkolesnikov.cz"
  }
];
