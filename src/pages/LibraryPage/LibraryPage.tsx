import AddBook from "../../components/AddBook/AddBook";
import MyLibraryBooks from "../../components/MyLibraryBooks/MyLibraryBooks";
import RecommendedSection from "../../components/RecommendedSection/RecommendedSection";
import Dashboard from "../../components/Dashboard/Dashboard";
import css from "./LibraryPage.module.css";

const LibraryPage = () => {
  return (
    <main className="container">
      <div className={css.libraryContainer}>
        <Dashboard>
          <AddBook />
          <RecommendedSection />
        </Dashboard>

        <MyLibraryBooks />
      </div>
    </main>
  );
};

export default LibraryPage;
