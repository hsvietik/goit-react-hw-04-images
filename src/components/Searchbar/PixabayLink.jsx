import styled from '@emotion/styled';
import logo from './pixabay-logo.svg';
const Link = styled.a`
  text-decoration: none;
  display: flex;
  margin-right: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 1.7;
  color: #ffffff;
  border: 0.5px solid #ffffff;
  padding: 6px;
  border-radius: 3px;
  span {
    text-align: center;
  }
`;
const Picture = styled.img`
  width: 70px;
  fill: #ffffff;
`;

export const PixabayLink = () => {
  return (
    <Link href="https://pixabay.com/" target="_blank">
      <span>Images are free from</span>
      <Picture class="pixabay-logo" src={logo} alt="pixabay logo" />
    </Link>
  );
};
