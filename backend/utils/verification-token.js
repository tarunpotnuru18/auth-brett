export default function generateVerificationToken() {
  let token = Math.floor(Math.random() * 900000 + 100000);

  return token.toString();
}
