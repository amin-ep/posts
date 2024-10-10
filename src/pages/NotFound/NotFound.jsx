import styled from "styled-components";
import LinkButton from "../../ui/LinkButton";
import Container from "../../ui/Container/Container";
import { useNavigate } from "react-router-dom";

const Heading = styled.div`
  font-size: 300px;
  font-weight: 900;
  background: url("/public/images/galaxy-background.jpg");
  background-clip: text;
  -moz-background-clip: text;
  -webkit-background-clip: text;
  background-size: cover;
  color: transparent;

  @media (max-width: 846px) {
    font-size: 200px;
  }

  @media (max-width: 532px) {
    font-size: 100px;
  }
`;

const Paragraph = styled.p`
  color: var(--color-gray-900);
  font-size: 18px;
`;

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-4">
      <Container
        size="small"
        extraClasses="mt-0 text-center"
        background="transparent"
      >
        <div className="grid grid-cols-1 gap-4">
          <Heading className="bg-clip-text">Oops!</Heading>
          <Paragraph className="uppercase">404 - Page not found</Paragraph>
          <Paragraph>it looks like you are in a wrong path!</Paragraph>
          <div className="w-64 mt-0 mx-auto">
            <LinkButton
              type="button"
              background="indigo"
              onClick={() => navigate(-1)}
            >
              Back To Previous Page
            </LinkButton>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NotFound;
