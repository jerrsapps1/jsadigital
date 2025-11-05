import JsaBuilder from '../JsaBuilder';

export default function JsaBuilderExample() {
  return (
    <div className="p-6 min-h-screen">
      <JsaBuilder 
        onSave={(data) => console.log('Draft saved:', data)}
        onSubmit={(data) => console.log('JSA submitted:', data)}
      />
    </div>
  );
}