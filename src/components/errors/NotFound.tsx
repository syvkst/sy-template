import { Heading } from "@/components/ui/headings";
import { Row, Col } from "@/components/ui/rowcol";
import { useTranslation } from "react-i18next";
import { HeartCrack } from "lucide-react";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <Row className="w-full mt-12 justify-center">
      <Col className="items-center">
        <Heading level="h2" className="m-0">
          {t("Valittua sivua ei löytynyt.", { ns: "components" })}
        </Heading>
        <HeartCrack className="h-10 w-10" />
      </Col>
    </Row>
  );
}
