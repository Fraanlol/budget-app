import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
  useLocation
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon, SpinnerIcon } from '@chakra-ui/icons'


export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action(e) {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );
    const location = useLocation();
    return (
      <>
        <div id="sidebar">
          <h1>Clientes</h1>
          <div>
          <Form method="get" action="" >
              <Button borderRadius='md' colorScheme='blue' variant='ghost' size='md' type="submit">Inicio</Button>
            </Form>
            <Form id="search-form" role="search">
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                {searching ? (
                <SpinnerIcon color='gray.300' id="search-spinner" />
                ):(
                <SearchIcon color='gray.300' />
                )}
              </InputLeftElement>
              <Input
                id="q"
                aria-label="Search contacts"
                placeholder="Buscar"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) => {
                  const isFirstSearch = q == null;
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
              />
            </InputGroup>
            </Form>
            <Form method="post">
              <Button colorScheme='green' borderRadius='md'  size='md' type="submit">Nuevo</Button>
            </Form>
          </div>
          <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No hay contactos</i>
            </p>
          )}
        </nav>
        </div>
        <div id="detail" className={
          navigation.state === "loading" ? "loading" : ""
        }>
          <Outlet />
        </div>
      </>
    );
  }