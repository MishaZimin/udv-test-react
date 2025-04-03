import Loader1 from '@/shared/assets/Loader1.svg';

export const Spiner = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-white bg-opacity-75">
      {/* <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div> */}
      <img
        className="h-16 w-16 animate-spin rounded-full"
        src={Loader1}
        alt="loader"
      />
      {/* <p>Загрузка</p> */}
    </div>
  );
};
