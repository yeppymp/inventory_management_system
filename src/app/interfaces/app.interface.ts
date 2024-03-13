export interface Menu {
  name: string;
  icon: string;
  route: string;
  adminRequired: boolean;
}

export interface DialogInformationParams {
  title: string;
  description: string;
}
