const Options = () => {
  return (
    <form>
      <label className="title" forHtml="word">
        Escribe aquí la palabra que hay que adivinar:
      </label>
      <input
        autofocus
        autocomplete="off"
        className="form__input"
        maxlength="15"
        type="text"
        id="word"
        name="word"
      />
    </form>
  );
};

export default Options;
