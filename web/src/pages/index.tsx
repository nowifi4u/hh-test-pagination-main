import Head from "next/head";
import {Inter} from "next/font/google";
import Table from "react-bootstrap/Table";
import {Alert, Container} from "react-bootstrap";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import { redirect, usePathname } from "next/navigation";
import { Pagination } from "@/components/pagination";
import { useRouter } from "next/router";

const inter = Inter({subsets: ["latin"]});

type TUserItem = {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  updatedAt: string
}

type TGetServerSideProps = {
  statusCode: number
  data?: {
    users: TUserItem[]
    count: number
    page: number
  }
}


export const getServerSideProps = (async (ctx: GetServerSidePropsContext): Promise<{ props: TGetServerSideProps }> => {
  try {
    const page = ctx.query.page != null ? Array.isArray(ctx.query.page) ? ctx.query.page[0] : ctx.query.page : 1;

    const res = await fetch(`http://localhost:3000/users?page=${page}`, {method: 'GET'})
    if (!res.ok) {
      return {props: {statusCode: res.status}}
    }

    return {
      props: {statusCode: 200, data: await res.json()}
    }
  } catch (e) {
    return {props: {statusCode: 500}}
  }
}) satisfies GetServerSideProps<TGetServerSideProps>

export const USERS_PER_PAGE = 20;
export const PAGINATION_SIZE = 10;

export default function Home({statusCode, data}: TGetServerSideProps) {
  const router = useRouter();

  const handlePagination = (page: number) => {
    const currentQuery = router.query;
    currentQuery.page = String(page);
    router.push({
      pathname: router.pathname,
      query: currentQuery,
    })
  };

  if (statusCode !== 200 || data == null) {
    return <Alert variant={'danger'}>Ошибка {statusCode} при загрузке данных</Alert>
  }

  const { users, count, page } = data;

  return (
    <>
      <Head>
        <title>Тестовое задание</title>
        <meta name="description" content="Тестовое задание"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={inter.className}>
        <Container>
          <h1 className={'mb-5'}>Пользователи</h1>

          <Table striped bordered hover>
            <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Дата обновления</th>
            </tr>
            </thead>
            <tbody>
            {
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.updatedAt}</td>
                </tr>
              ))
            }
            </tbody>
          </Table>

          <Pagination total={Math.ceil(count / USERS_PER_PAGE)} currentPage={page} max={PAGINATION_SIZE} onClick={handlePagination} />

        </Container>
      </main>
    </>
  );
}
