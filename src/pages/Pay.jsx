import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";
import { Sparkles, ShieldCheck, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Pay = () => {
  const [clientId, setClientId] = useState("");
  const { isAdmin } = useAuth();

  useEffect(() => {
    axios
      .get("/payment/config")
      .then((res) => {
        setClientId(res.data.clientId);
      })
      .catch(() => {
        // Fallback if local mock endpoint not available
        setClientId("sb");
      });
  }, []);

  if (isAdmin) return null;

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg rounded-3xl border border-border/80 bg-card/95 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Nazad na početnu</span>
          </Link>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
            <Sparkles className="h-3 w-3" />
            BH KONVER
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-foreground">
            Aktivacija Premium pristupa (24h)
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Otključajte 24 sata neograničenog korištenja svih Freemium i Premium alata, generatora i konverzija na BH KONVER-u.
          </p>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/20">
          <div>
            <span className="text-xs font-semibold text-muted-foreground block uppercase">
              Paket: 24 sata neograničeno
            </span>
            <span className="text-2xl font-extrabold text-foreground">
              2.00 € <span className="text-sm font-semibold text-primary">(~3.91 BAM)</span>
            </span>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <span className="block font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 justify-end">
              <ShieldCheck className="h-3.5 w-3.5" /> Sigurno
            </span>
            <span>PayPal Express</span>
          </div>
        </div>

        {clientId ? (
          <PayPalScriptProvider options={{ "client-id": clientId, currency: "EUR" }}>
            <PayPalButtons
              style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "EUR",
                        value: "2.00",
                      },
                      description: "BH KONVER - 24h Premium pristup (2.00 EUR / ~3.91 BAM)",
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  axios.post("/webhook/paypal", {
                    orderID: data.orderID,
                    payerID: data.payerID,
                    amount: "2.00",
                    currency: "EUR",
                    email: details.payer.email_address,
                  }).catch(() => {
                    // Ignore webhook errors
                  });

                  toast.success("Uplata od 2.00 € (~3.91 BAM) uspješna!", {
                    description: "Vaš Premium pristup je aktiviran.",
                  });
                });
              }}
              onError={(err) => {
                console.error("Greška pri PayPal uplati:", err);
                toast.error("Greška pri uplati. Pokušajte ponovo.");
              }}
            />
          </PayPalScriptProvider>
        ) : (
          <div className="py-6 text-center text-sm text-muted-foreground animate-pulse">
            Učitavanje PayPal integracije...
          </div>
        )}

        <div className="pt-2 border-t border-border/60">
          <a
            href="https://www.paypal.com/paypalme/alenjusufovic/2EUR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0070ba] hover:bg-[#003087] text-white px-4 py-2.5 text-xs font-bold transition-colors shadow-sm"
          >
            <span>Direktna uplata putem PayPal.Me (2.00 € / ~3.91 BAM)</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <p className="mt-2 text-[11px] text-muted-foreground text-center">
            Primalac uplate: alenjusufovic@yahoo.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pay;
