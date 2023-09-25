export interface ExchangeResponse {
  state: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  environment_id: string;
  environment_name: string;
  legal_entity_id: string;
  legal_entity_name: string;
  user_id: string;
  email: string;
  family_name: string;
  given_name: string;
  mode: string;
  scope: string;
}
