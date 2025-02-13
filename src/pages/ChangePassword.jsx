

const ChangePassword = () => {


  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded-md w-full max-w-[30vw] h-[320px] mx-auto mt-20 p-4 relative">
          <form action=" ">
            <div className="">
              <label className="block text-sm font-medium py-2">Old password</label>
              <input
                type="text"
                className="bg-[#f6f6f6] rounded-xl outline-none pr-52 pl-5 py-3"
                placeholder="Old Password" />
            </div>
            <div className="">
              <label className="block text-sm font-medium py-2">New password</label>
              <input
                type="text"
                className="bg-[#f6f6f6] rounded-xl outline-none pr-52 pl-5 py-3"
                placeholder="New Password" />
            </div>
            <div className="">
              <label className="block text-sm font-medium py-2">Confirm new password</label>
              <input
                type="text"
                className="bg-[#f6f6f6] rounded-xl outline-none pr-52 pl-5 py-3"
                placeholder="Confirm new password" />
            </div>
            <button className="bg-[#40176c]  text-white rounded-full px-7 py-2 absolute right-0 mt-4 m-5">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;