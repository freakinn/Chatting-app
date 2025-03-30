
import { mockConversations } from "@/data/mockData";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <div className="min-h-screen h-screen flex flex-col">
      <Layout conversations={mockConversations} />
    </div>
  );
};

export default Index;
