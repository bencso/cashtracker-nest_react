import api from "@/interceptor/api";
import { addItem, deleteItem, editItem, getItems } from "@/libs/inventory";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { Product } from "@/constants/product.interface"
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";

export type PantryType = {
    code: string;
    name: string;
    expiredAt: string[];
    amount: number[];
    products: number[] | [];
}

type PantryContextType = {
    pantry: PantryType[];
    loadPantry: any;
    addPantryItem: any;
    deletePantryItem: any;
    editPantryItem: any;
    isLoading: boolean;
    product: Product | null;
    setProductItemByCode: any;
    setProductItemByKeyword: any;
    scanned: boolean;
    setScanned: any;
    setProduct: any;
    getItemsById: any;
};

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export function PantryProvider({ children }: { children: ReactNode }) {
    const [pantry, setPantry] = useState<PantryType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [scanned, setScanned] = useState<boolean>(false);
    const [product, setProduct] = useState<Product | null>(null);
    const { t } = useTranslation();

    const loadPantry = async () => {
        try {
            let returnItems = [] as PantryType[];
            const pantryItems = await getItems();
            pantryItems.map((item: any) => {
                //! Ez egy Group by, ami dátum alapján müködik az adott code-al rendelkező itemen belül, ezenfelül pedig sumolja is a dátumnak megfelelően
                //! Az ok hogy nem SQL-ben csináljuk, hogy kell nekünk külön külön is, mert külön külön is módosítani kell majd :)
                //TODO: Késöbbiekben ha van valami ötlet, akkor refaktorálni ezt a kód részletet
                Object.keys(item).map((key) => {
                    const dateGroupByItem = item[key].reduce((acc: any, curr: Product) => {
                        const date = curr.expiredat ? new Date(curr.expiredat).toLocaleDateString() : new Date().toLocaleDateString();
                        const code = curr.code ? curr.code : "";
                        acc[code] = acc[code] || {};
                        acc[code][date] = (acc[code][date] || 0) + curr.amount;
                        return acc;
                    }, {});

                    const products =
                        item[key].map((product: Product) => ({
                            index: product.index,
                            amount: product.amount,
                            expiredAt: product.expiredat
                        }));

                    returnItems.push({
                        code: key,
                        products,
                        name: item[key][0].name,
                        expiredAt: Object.keys(dateGroupByItem[key]),
                        amount: Object.values(dateGroupByItem[key]),
                    });
                });
            });
            setPantry(returnItems || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getItemsById = async (code: any) => {
        try {
            const response = await api.get("/pantry/" + code.code);
            const item = response.data;
            return item;
        } catch {
            return null
        }
        finally {
            setIsLoading(false);
        }
    }

    const setProductItemByCode = async (code: string) => {
        try {
            const response = await api.get("/product/items/code/" + code);
            const item = response.data;
            if (!item.code && !item.product_name) throw new Error("Nincs ilyen termék");
            setProduct({
                code: item.code,
                name: item.product_name ? item.product_name : null,
            });
        } catch {
            if (code) setProduct({
                code: code,
                name: null
            })
            else setProduct(null)
        }
        finally {
            setIsLoading(false);
        }
    }

    const setProductItemByKeyword = async (keyword: string) => {
        try {
            const response = await api.get("/product/items/keyword/" + keyword);
            const item = response.data;
            setProduct({
                code: item.code || null,
                name: item.product_name || null,
            });
        } catch {
            if (keyword) setProduct({
                name: keyword,
                code: null
            })
            else setProduct(null)
        }
        finally {
            setIsLoading(false);
        }
    }

    const addPantryItem = async ({
        code,
        product_name,
        amount,
        expiredAt,
    }: {
        code: string;
        product_name: string;
        amount: number;
        expiredAt: Date;
    }) => {
        try {
            await addItem({
                code,
                product_name,
                amount,
                expiredAt,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setScanned(false);
            loadPantry();
            setIsLoading(false);
        }
    }

    const deletePantryItem = async ({
        id
    }: {
        id: number[]
    }) => {
        try {
            await deleteItem({
                id
            });
        } catch (error) {
            Alert.alert("Hiba történt a törlés közben!", "Hiba");
            console.error(error);
        } finally {

            setIsLoading(false);
        }
    }

    const editPantryItem = async ({
        id,
        amount
    }: {
        id: number;
        amount: number;
    }) => {
        try {
            await editItem({
                id,
                amount
            });
        } catch {
            Alert.alert(t("inventory.editItem.amountInput.error"), t("inventory.editItem.amountInput.errorTitle"));
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadPantry();
    }, []);

    return (
        <PantryContext.Provider value={{ pantry, loadPantry, isLoading, addPantryItem, deletePantryItem, product, getItemsById, setProductItemByCode, setProductItemByKeyword, scanned, setScanned, setProduct, editPantryItem }}>
            {children}
        </PantryContext.Provider>
    );
}

export function usePantry() {
    const context = useContext(PantryContext);
    if (!context) {
        throw new Error("usePantry must be used within a PantryProvider");
    }
    return context;
}
