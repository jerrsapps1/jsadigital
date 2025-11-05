import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onRegister?: () => void;
}

export default function LoginForm({ onLogin, onRegister }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    setError("");
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card" data-testid="card-login">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <div className="text-3xl">🦺</div>
          </div>
          <CardTitle className="text-2xl font-bold">JSA Safety Platform</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to access your Job Safety Analysis system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@acme.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-password"
              />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive" data-testid="text-error">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" data-testid="button-login">
              Sign In
            </Button>

            {onRegister && (
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <button 
                  type="button"
                  className="text-primary hover:underline p-0 h-auto"
                  onClick={onRegister}
                  data-testid="button-register-link"
                >
                  Register
                </button>
              </div>
            )}
          </form>

          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Demo credentials: admin@acme.com / supervisor@acme.com / worker@acme.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}