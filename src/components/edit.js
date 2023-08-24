import { Form, useLoaderData, redirect, } from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
  }

export default function EditContact() {
  const { contact } = useLoaderData();
  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Nombre</span>
        <input
          placeholder="Nombre"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
      </p>
      <label>
        <span>Email</span>
        <input
          type="email"
          name="mail"
          placeholder="E-Mail"
          defaultValue={contact.mail}
        />
      </label>
      <label>
        <span>Telefono</span>
        <input
          type="text"
          name="phone"
          placeholder="12-3456-7891"
          defaultValue={contact.phone}
        />
      </label>
      {/* Elemento que contenga todos los servicios*/}
      <p>
        <button type="submit">Guardar</button>
        <button type="button" onClick={() => {
            navigate(-1);
          }}>Cancelar</button>
      </p>
    </Form>
  );
}