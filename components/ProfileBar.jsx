import { LogoutOutlined, SmileOutlined } from "@ant-design/icons";

export default function ProfileBar() {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-bold">Welcome</h1>
        <SmileOutlined />
      </div>
      <button
        className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        <LogoutOutlined />
        <span>Logout</span>
      </button>
    </div>
  );
}
