interface UserInfoProps {
  name: string;
  avatar: string;
  description: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ avatar, name, description }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-32 gap-5">
      <div
        className="h-[200px] w-[200px] border rounded-full border-black mb-4"
      >
        <img
          src={avatar}
          alt="avatar"
          className="h-full w-full"
        />
      </div>
      <h2
        className="text-2xl font-semibold mb-3"
      >
        {name}
      </h2>
      <p
        className="text-lg mb-2">
        {description}
      </p>
    </div>
  );
};

export default UserInfo;
