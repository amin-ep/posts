/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const backgrounds = {
  primary: css`
    background: radial-gradient(
        circle at 30% 86%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.03) 8%,
        transparent 8%,
        transparent 92%
      ),
      radial-gradient(
        circle at 55% 100%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.03) 8%,
        transparent 8%,
        transparent 92%
      ),
      radial-gradient(
        circle at 40% 75%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.03) 6%,
        transparent 6%,
        transparent 94%
      ),
      radial-gradient(
        circle at 7% 99%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.03) 6%,
        transparent 6%,
        transparent 94%
      ),
      radial-gradient(
        circle at 69% 76%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.03) 6%,
        transparent 6%,
        transparent 94%
      ),
      radial-gradient(
        circle at 2% 35%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.03) 6%,
        transparent 6%,
        transparent 94%
      ),
      radial-gradient(
        circle at 14% 48%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.03) 6%,
        transparent 6%,
        transparent 94%
      ),
      radial-gradient(
        circle at 28% 87%,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.04) 4%,
        transparent 4%,
        transparent 96%
      ),
      radial-gradient(
        circle at 65% 14%,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.04) 4%,
        transparent 4%,
        transparent 96%
      ),
      radial-gradient(
        circle at 51% 36%,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.04) 4%,
        transparent 4%,
        transparent 96%
      ),
      radial-gradient(
        circle at 6% 93%,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.04) 4%,
        transparent 4%,
        transparent 96%
      ),
      linear-gradient(
        90deg,
        rgb(30, 64, 175),
        rgb(29, 78, 216),
        rgb(37, 99, 235)
      );
  `,
  secondary: css`
    background: radial-gradient(
        circle at 30% 86%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.03) 8%,
        transparent 8%,
        transparent 92%
      ),
      radial-gradient(
        circle at 55% 100%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.03) 8%,
        transparent 8%,
        transparent 92%
      ),
      radial-gradient(
        circle at 40% 75%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.03) 6%,
        transparent 6%,
        transparent 94%
      ),
      radial-gradient(
        circle at 7% 99%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.03) 6%,
        transparent 6%,
        transparent 94%
      ),
      radial-gradient(
        circle at 69% 76%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.03) 6%,
        transparent 6%,
        transparent 94%
      ),
      radial-gradient(
        circle at 2% 35%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.03) 6%,
        transparent 6%,
        transparent 94%
      ),
      radial-gradient(
        circle at 14% 48%,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0.03) 6%,
        transparent 6%,
        transparent 94%
      ),
      radial-gradient(
        circle at 28% 87%,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.04) 4%,
        transparent 4%,
        transparent 96%
      ),
      radial-gradient(
        circle at 65% 14%,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.04) 4%,
        transparent 4%,
        transparent 96%
      ),
      radial-gradient(
        circle at 51% 36%,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.04) 4%,
        transparent 4%,
        transparent 96%
      ),
      radial-gradient(
        circle at 6% 93%,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.04) 4%,
        transparent 4%,
        transparent 96%
      ),
      linear-gradient(
        90deg,
        rgb(30, 64, 175),
        rgb(29, 78, 216),
        rgb(37, 99, 235)
      );
  `,
};

const StyledDiv = styled.div`
  height: 100vh;
  position: relative;

  ${(props) => backgrounds[props.background]}

  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

StyledDiv.defaultProps = {
  background: "primary",
};

function AuthLayout({ children, background }) {
  return <StyledDiv background={background}>{children}</StyledDiv>;
}

export default AuthLayout;
