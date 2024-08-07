import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="flex items-center text-xl">
        <span className="text-vpwhite">Page Not Found</span>
        <div className="mx-3 w-[2px] h-5 bg-white" />
        <Link href="/" className="text-elypink">
          Home
        </Link>
      </h1>
    </div>
  );
};

export default NotFound;
