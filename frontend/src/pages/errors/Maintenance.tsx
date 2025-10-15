import GeneralLayout from "../../layouts/GeneralLayout";

export default function Maintenance() {
  return (
    <GeneralLayout>
      <div className="text-center">
        <h1 className="text-7xl font-primary text-tealGreen mb-4">🛠 Maintenance</h1>
        <p className="text-xl mb-6">We’re currently performing some updates.</p>
        <p>Please check back soon!</p>
      </div>
    </GeneralLayout>
  );
}
