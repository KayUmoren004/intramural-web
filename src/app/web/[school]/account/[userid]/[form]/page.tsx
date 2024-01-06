type accountPageProps = {
  params: { school: string; userid: string; form: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = ({
  params: { school, userid, form },
  searchParams,
}: accountPageProps) => {
  console.log("Params", form);
  return (
    <div>
      <h1>Account</h1>
      <p>School: {school}</p>
      <p>User ID: {userid}</p>
      <p>Search: {JSON.stringify(searchParams)}</p>
    </div>
  );
};

export default Page;
