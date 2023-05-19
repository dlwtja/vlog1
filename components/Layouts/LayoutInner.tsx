import useRootState from "../../src/core/hooks/useRootState";
import GlobalStyle from "../../src/styles/global";

const LayoutInner = ({ children }: React.PropsWithChildren) => {
  const { mode } = useRootState((state) => state.theme);

  return (
    <>
      {children}
      <GlobalStyle mode={mode} />
    </>
  );
};

export default LayoutInner;
