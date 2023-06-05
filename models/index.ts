export interface Root {
  alert_type: AlertType;
  body_of_water: BodyOfWater;
  company: Company;
  payable: Payable;
  payment: Payment;
  payment_method: PaymentMethod;
  product: Product;
  route: Route;
  service: Service;
  user: User;
  user_address: UserAddress;
}

export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  password: string;
  remember_token: string;
  created_at: string;
  updated_at: string;
  surname: any;
  phone_number: string;
  status: string;
  photo: string;
  company: Company;
  role: string;
}

export interface Address {
  id: string;
  created_at: string;
  updated_at: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface UserAddress {
  id: string;
  created_at: string;
  updated_at: string;
  user_address_type: string;
  user_address_id: User;
  address_id: Address;
}

export interface AlertType {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  icon: string;
}

export interface BodyOfWater {
  id: string;
  created_at: string;
  updated_at: string;
  customer: User;
  name: string;
  type: string;
  size: string;
  condition: string;
}

export interface Company {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  website: string;
}

export interface Payable {
  id: string;
  created_at: string;
  updated_at: string;
  date: string;
  description: string;
  total: number;
  notes: string;
  type: string;
  customer: User;
  technician: User;
}

export interface Payment {
  id: string;
  created_at: string;
  updated_at: string;
  date: string;
  amount: number;
  notes: string;
  invoice: Payable;
  payment_method: PaymentMethod;
}

export interface PaymentMethod {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  notes: string;
  price: string;
}

export interface Route {
  id: string;
  created_at: string;
  updated_at: string;
  start_date: string;
  end_date: string;
  list_of_customers_to_visit: string;
  technician: User;
}

export interface Service {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  notes: string;
  price: string;
}
