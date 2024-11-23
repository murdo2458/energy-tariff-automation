export interface TariffRate {
  value_exc_vat: number;
  value_inc_vat: number;
  valid_from: string;
  valid_to: string;
}

export interface TariffResponse {
  results: TariffRate[];
}
