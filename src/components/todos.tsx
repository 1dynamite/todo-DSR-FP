export default function Todos() {
  return (
    <div className="todos-container">
      <form className="add-todo-form">
        <ul>
          <li>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </li>
          <li>
            <label htmlFor="title">Description</label>
            <input type="text" id="description" name="description" required />
          </li>
          <li>
            <button type="submit">Add</button>
          </li>
        </ul>
      </form>

      <div>
        <div className="todos">
          <div>
            <div>Name</div>
            <div>
              <span>Title</span>
              <span>One long description</span>
            </div>
            <div>
              <img alt="edit-icon" height={16} width={16} src="pencil.png" />
              <img alt="delete-icon" height={16} width={16} src="x.png" />
            </div>
          </div>
          <div>
            <div>Name</div>
            <div>
              <span>Title</span>
              <span>One long description</span>
            </div>
            <div>
              <img alt="edit-icon" height={16} width={16} src="pencil.png" />
              <img alt="delete-icon" height={16} width={16} src="x.png" />
            </div>
          </div>
          <div>
            <div>Name</div>
            <div>
              <span>Title</span>
              <span>One long description</span>
            </div>
            <div>
              <img alt="edit-icon" height={16} width={16} src="pencil.png" />
              <img alt="delete-icon" height={16} width={16} src="x.png" />
            </div>
          </div>
          <div>
            <div>Name</div>
            <div>
              <span>Title</span>
              <span>One long description</span>
            </div>
            <div>
              <img alt="edit-icon" height={16} width={16} src="pencil.png" />
              <img alt="delete-icon" height={16} width={16} src="x.png" />
            </div>
          </div>
          <div>
            <div>Name</div>
            <div>
              <span>Title</span>
              <span>One long description</span>
            </div>
            <div>
              <img alt="edit-icon" height={16} width={16} src="pencil.png" />
              <img alt="delete-icon" height={16} width={16} src="x.png" />
            </div>
          </div>
          <div>
            <div>Name</div>
            <div>
              <span>Title</span>
              <span>One long description</span>
            </div>
            <div>
              <img alt="edit-icon" height={16} width={16} src="pencil.png" />
              <img alt="delete-icon" height={16} width={16} src="x.png" />
            </div>
          </div>
          <div>
            <div>Name</div>
            <div>
              <span>Title</span>
              <span>One long description</span>
            </div>
            <div>
              <img alt="edit-icon" height={16} width={16} src="pencil.png" />
              <img alt="delete-icon" height={16} width={16} src="x.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
