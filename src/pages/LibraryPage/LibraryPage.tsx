import { useState } from "react";
import AddBook from "../../components/AddBook/AddBook";
import MyLibraryBooks from "../../components/MyLibraryBooks/MyLibraryBooks";
import RecommendedSection from "../../components/RecommendedSection/RecommendedSection";
import Dashboard from "../../components/Dashboard/Dashboard";
import css from "./LibraryPage.module.css";

const LibraryPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleBookAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="container">
      <div className={css.libraryContainer}>
        <Dashboard>
          <AddBook onBookAdded={handleBookAdded} />
          <RecommendedSection />
        </Dashboard>

        <MyLibraryBooks refreshKey={refreshKey} />
      </div>
    </main>
  );
};

export default LibraryPage;
