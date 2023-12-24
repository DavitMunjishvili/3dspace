import Button from "~/components/common/Button";
import CloseButton from "~/components/common/CloseButton";

export default function ComponentsLibrary() {
  return (
    <main>
      <section>
        <h1 className="my-4 border-b-2 border-indigo-900 p-2 text-4xl">
          Buttons
        </h1>
        <div className="grid grid-cols-6 gap-8 child:h-max child:rounded-md child:border child:border-gray-600 child:p-4">
          <div className="space-y-2">
            <h2 className="border-b border-indigo-500 pb-1 text-xl">Extra</h2>
            <Button fullWidth>Full Width</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button iconButton>for icons</Button>
            <CloseButton />
          </div>
          <div className="space-y-2">
            <h2 className="border-b border-indigo-500 pb-1 text-xl">Filled</h2>
            <Button variant="filled">Default</Button>
            <Button variant="filled" color="green">
              Green
            </Button>
            <Button variant="filled" color="blue">
              Blue
            </Button>
            <Button variant="filled" color="red">
              Red
            </Button>
          </div>
          <div className="space-y-2">
            <h2 className="border-b border-indigo-500 pb-1 text-xl">Light</h2>
            <Button variant="light">Default</Button>
            <Button variant="light" color="green">
              Green
            </Button>
            <Button variant="light" color="blue">
              Blue
            </Button>
            <Button variant="light" color="red">
              Red
            </Button>
          </div>
          <div className="space-y-2">
            <h2 className="border-b border-indigo-500 pb-1 text-xl">
              Outlined
            </h2>
            <Button variant="outlined">Default</Button>
            <Button variant="outlined" color="green">
              Green
            </Button>
            <Button variant="outlined" color="blue">
              Blue
            </Button>
            <Button variant="outlined" color="red">
              Red
            </Button>
          </div>
          <div className="space-y-2">
            <h2 className="border-b border-indigo-500 pb-1 text-xl">Subtle</h2>
            <Button variant="subtle">Default</Button>
            <Button variant="subtle" color="green">
              Green
            </Button>
            <Button variant="subtle" color="blue">
              Blue
            </Button>
            <Button variant="subtle" color="red">
              Red
            </Button>
          </div>
          <div className="space-y-2">
            <h2 className="border-b border-indigo-500 pb-1 text-xl">Text</h2>
            <Button variant="text">Default</Button>
            <Button variant="text" color="green">
              Green
            </Button>
            <Button variant="text" color="blue">
              Blue
            </Button>
            <Button variant="text" color="red">
              Red
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
