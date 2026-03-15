export interface Venue {
  objectId: string;
  name: string;
  address1: string;
  suburb: string;
  cuisines: string[];
  imageLink: string;
  open: string;
  close: string;
  deals: {
    objectId: string;
    discount: string;
    dineIn: string;
    lightning: string;
    qtyLeft: string;
    open?: string;
    close?: string;
    start?: string;
    end?: string;
  }[];
}
