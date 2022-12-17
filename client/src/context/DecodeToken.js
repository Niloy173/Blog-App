import jwt_decode from 'jwt-decode';

const JwtDecoder = (token) => {
  const decoded = token ? jwt_decode(token): null;
  return decoded
}

export default JwtDecoder;