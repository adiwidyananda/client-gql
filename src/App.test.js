import React from 'react'
import App from './App'
import ReactDOM from 'react-dom'
import Todo from './Components/Todo'
import { render , fireEvent, act} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

var sampledataId = "1b15e910-be2b-4ab4-a6d8-253ca793ac28"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
let AppgetById,TodogetById;


beforeEach(() => {
  const component = render(<App />);
  AppgetById = component.getByTestId
  const Todocomponent = render(<ApolloProvider client={client}><Todo id={sampledataId}/></ApolloProvider>)
  TodogetById = Todocomponent.getByTestId

})
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("render data to application complete", () => {
    var header = AppgetById("application");
    expect(header.textContent).toBe("complete") 
})
test("change input value for add Todo works correctly", () => {
  const content = AppgetById("content")
  const status = AppgetById("status")
  fireEvent.change(content, {
    target: {
      value: "todo testing"
    }
  })
  fireEvent.change(status, {
    target: {
      value: "IN_PROGRESS"
    }
  })
  const contentupdate = AppgetById("content")
  expect(contentupdate.value).toBe("todo testing") 
  const statusupdate = AppgetById("status")
  expect(statusupdate.value).toBe("IN_PROGRESS") 
})

test("add Todo test", async () => {
  const content = AppgetById("content")
  const status = AppgetById("status")
  const addBtn = AppgetById("addBtn")
  fireEvent.change(content, {
    target: {
      value: "Add todo testing"
    }
  })
  fireEvent.change(status, {
    target: {
      value: "IN_PROGRESS"
    }
  })
  await act(async () => {
      fireEvent.click(addBtn)
  });
})

test("change input value for edit Todo works correctly",() => {
  const showbutton = TodogetById("show")
  fireEvent.click(showbutton)
  const editcontent = TodogetById("editcontent")
  const editstatus = TodogetById("editstatus")
  fireEvent.change(editcontent, {
    target: {
      value: "edit todo testing"
    }
  })
  fireEvent.change(editstatus, {
    target: {
      value: "IN_PROGRESS"
    }
  })

  const contentupdate = TodogetById("editcontent")
  expect(contentupdate.value).toBe("edit todo testing") 
  const statusupdate = TodogetById("editstatus")
  expect(statusupdate.value).toBe("IN_PROGRESS")
})

test("edit Todo test", async () => {
  const showbutton = TodogetById("show")
  fireEvent.click(showbutton)
  const editcontent = TodogetById("editcontent")
  const editstatus = TodogetById("editstatus")
  const editBtn = TodogetById("editBtn")
  fireEvent.change(editcontent, {
    target: {
      value: "edit todo testing"
    }
  })
  fireEvent.change(editstatus, {
    target: {
      value: "IN_PROGRESS"
    }
  })
  await act(async () => {
    fireEvent.click(editBtn)
  });  
})

test("delete todo test", async () => {
  const deleteBtn = TodogetById("deleteBtn")
  await act(async () => {
    fireEvent.click(deleteBtn)
  }); 
})