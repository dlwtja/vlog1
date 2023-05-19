import styled from "styled-components";
import PostList from "./PostList";

const S = styled(PostList)`
  .title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5.2rem 0 3.2rem 0;
    font-size: 3.6rem;
    color: var(--text1);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  @media screen and (max-width: 700px) {
    .title-wrap {
      margin: 3rem 0;
      font-size: 2.8rem;
    }
  }
`;

export default S;
