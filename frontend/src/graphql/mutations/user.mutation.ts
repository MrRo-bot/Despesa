import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      name
      username
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: loginInput!) {
    login(input: $input) {
      _id
      username
      password
    }
  }
`;
export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
