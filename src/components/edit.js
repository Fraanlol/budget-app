import { Form, useLoaderData, redirect, useNavigate} from "react-router-dom";
import { updateContact } from "../contacts";
import { Stack, Box, Button, Heading, Card, CardHeader, CardBody, Divider, Center, InputGroup, InputLeftAddon, Input} from '@chakra-ui/react'



export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
  }

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();
  return (
    <Form method="post" id="contact-form">
      <Card p='20px'>
          <CardHeader>
            <Heading size='lg'>
              <Stack spacing={4}>
                <InputGroup size='lg'>
                  <InputLeftAddon pr={'30px'} children='Nombre' />
                    <Input pr='40px' focusBorderColor='lime' type='text'  aria-label="First name" name="first" defaultValue={contact.first} placeholder='NombreCliente'/>
                </InputGroup>
                <InputGroup size='lg'>
                  <InputLeftAddon pr={'52px'} children='Email' />
                    <Input pr='40px' focusBorderColor='lime' name="mail" defaultValue={contact.mail} type='email' placeholder='mailCliente@tudominio.com'/>
                </InputGroup>
                <InputGroup size='lg'>
                  <InputLeftAddon pr={'23px'} children='Telefono' />
                    <Input pr='40px' focusBorderColor='lime' type='text' placeholder='11-2222-3333-4' name="phone" defaultValue={contact.phone}/>
                </InputGroup>
              </Stack>
            </Heading>
          </CardHeader>
            <CardBody>
              <Center>
                <Divider m='20px' w='70%' />
              </Center>
              <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
                <Button borderRadius='md' colorScheme='blue' variant='ghost' size='md' type="submit">Guardar</Button>
                <Button colorScheme='red' borderRadius='md'  size='md' type="button" onClick={() => {navigate(-1);}}>Cancelar</Button>
              </Box>
            </CardBody>
       </Card>
    </Form>
  );
}