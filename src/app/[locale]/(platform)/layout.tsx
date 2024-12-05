import { Header } from "./_components/Header";

interface PlatformLayoutProps {
  children: React.ReactNode;
}

const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children }) => {
  return (
    <div className="flex size-full flex-col overflow-scroll">
      <Header />
      <div className="size-full overflow-hidden">{children}</div>
    </div>
  );
};

export default PlatformLayout;
