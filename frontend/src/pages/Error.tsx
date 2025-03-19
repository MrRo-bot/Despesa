const Error = () => {
  return (
    <section>
      <div className=" text-white">
        <div className="flex ">
          <div className="m-auto text-center">
            <div>
              <img referrerPolicy="no-referrer" src="/404.svg" alt="404" />
            </div>

            <a
              href="/"
              className="transition duration-500 ease-out bg-transparent font-bold text-2xl hover:bg-[#F6009B] focus:bg-[#F6009B] text-[#F6009B] hover:text-white focus:text-white rounded-lg shadow hover:shadow-lg focus:shadow-lg py-2 px-4.5 border border-[#F6009B] hover:border-transparent"
            >
              Home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
