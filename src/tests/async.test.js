import { render, screen } from "@testing-library/react";
import AsyncList from "../components/AsyncList";


describe('ASYNC TESTS', () => {
  test('Should be return de food data', async () => {
    render( <AsyncList />);

    // ADVISE: EVER USE ALL QUERYS WITH START WITH THE WORD 'FINDBY' BECAUSE THESE QUERYS RETURN A PROMISE
    const hamburger = await screen.findByText(/Hamburgesa/i);

    expect(hamburger).toBeInTheDocument();
  });
});