import React, { FormEvent } from "react";
import styles from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

interface SearchBarProps {
  onSubmit: any;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("input") as HTMLInputElement;
    const topic = input.value.trim();
    if (!topic) {
      toast.error("Please enter search term!");
      return;
    }
    onSubmit(topic);
    form.reset();
  };
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Search photos here</h1>
        <div className={styles.boxForma}>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              name="input"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <button className={styles.btn} type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
    </div>
  );
};

export default SearchBar;
