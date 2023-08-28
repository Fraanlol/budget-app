import { Form, useLoaderData, useFetcher, } from "react-router-dom";
import { getContact, updateContact } from "../contacts";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text, Button, Heading, Card, CardHeader, CardBody, Divider, Center} from '@chakra-ui/react'

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { contact };
}

export default function Client() {

  const { contact } = useLoaderData();

  return (
    <Box display='flex' flexDir='column' gap='20px'>
       <Card p='20px'>
          <CardHeader>
            <Heading size='lg'>
              {contact.first ? (
                <>
                  {contact.first} 
                </>
              ) : (
                <i>No Name</i>
              )}{" "}
              </Heading>
            </CardHeader>
            <CardBody>
              {contact.mail && <Text size='lg'>{contact.mail}</Text>}
              {contact.phone && <Text size='lg'>{contact.phone}</Text>}
              <Center>
                <Divider m='20px' w='70%' />
              </Center>
              <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
                <Form action="edit">
                  <Button borderRadius='md' colorScheme='blue' variant='ghost' size='md' type="submit">Editar</Button>
                </Form>
                <Form
                  method="post"
                  action="destroy"
                  onSubmit={(event) => {
                    if (
                      !confirm(
                        "Please confirm you want to delete this record."
                      )
                    ) {
                      event.preventDefault();
                    }
                  }}
                >
                  <Button  colorScheme='red' borderRadius='md'  size='md' type="submit">Borrar</Button>
                </Form>
              </Box>
            </CardBody>
       </Card>
      <div>
         <Tabs>
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>thr2ee!</p>
            </TabPanel>
            <TabPanel>
              <p>thr3ee!</p>
            </TabPanel>
            <TabPanel>
              <p>th4ree!</p>
            </TabPanel>
            <TabPanel>
              <p>th5ee!</p>
            </TabPanel>
            <TabPanel>
              <p>thr6ee!</p>
            </TabPanel>
          </TabPanels>
        </Tabs> 
      </div>
    </Box>
  );
}
