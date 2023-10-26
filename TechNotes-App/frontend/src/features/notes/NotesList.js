// NotesList.jsx
import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";

const NotesList = () => {
	// здійснення запиту до API для отримання списку нотаток
    const {
        data: notes,
        isLoading, isSuccess,
        isError, error
    } = useGetNotesQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    );

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    };
  // після успішного запиту до API
  if (isSuccess) {
	// отримуєте ідентифікатори (ключі) нотаток з об'єкту notes
    const { ids } = notes;
    // створення вмісту для таблиці відображення нотаток
    const tableContent = ids?.length
      ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
      : null

    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">Username</th>
            <th scope="col" className="table__th note__created">Created</th>
            <th scope="col" className="table__th note__updated">Updated</th>
            <th scope="col" className="table__th note__title">Title</th>
            <th scope="col" className="table__th note__username">Owner</th>
            <th scope="col" className="table__th note__edit">Edit</th>
          </tr>
        </thead>
        <tbody>
            {tableContent}
        </tbody>
      </table>
    )
  }

    return content
}
export default NotesList
