import { useState } from 'react';
import DateInput from './DateInput';

//redux
import { useSelector, useDispatch } from 'react-redux';

//api
import { getUserOrder } from '../api/order';
import { useEffect } from 'react';

//icon
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

const UserOrder = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date('2021/1/1'));
  const [endDate, setEndDate] = useState(new Date());

  const [orderData, setOrderData] = useState([]);

  //
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        //less user id
        if (auth.id) {
          const res = await getUserOrder(auth.id);
          setOrderData(res.data.order);
          console.log(res.data.order, 'con');
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [auth]);

  return (
    <div className="border border-black grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 flex gap-2 items-center ">
        <p className="font-bold">購買日期：</p>
        <DateInput
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
      <div className="col-span-12">
        <ul className="flex flex-col flex-wrap gap-4 justify-center">
          {orderData.map((item) => (
            <li key={item?.id} className="flex flex-col">
              <table className="border border-black">
                <thead>
                  <tr>
                    <th className="p-2">訂單編號</th>
                    <th className="p-2">訂單建立時間</th>
                    <th className="p-2">訂單狀態</th>
                    <th className="p-2">總價</th>
                    <th className="p-2">付款方式</th>
                    <th className="p-2">聯絡客服</th>
                  </tr>
                </thead>
                <tbody>
                  {/* map tr */}
                  <tr>
                    <td className="p-2">{item?.id}</td>
                    <td className="p-2">
                      {new Date(item?.createAt).toLocaleString()}
                    </td>
                    <td className="p-2">運送中</td>
                    <td className="p-2">代計算</td>
                    <td className="p-2">信用卡</td>
                    <td className="p-2">
                      <button>聯絡客服</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={() => setIsShow((pre) => !pre)}
                className="flex items-center text-sm"
              >
                {isShow ? (
                  <MdKeyboardArrowUp size={30} />
                ) : (
                  <MdKeyboardArrowDown size={30} />
                )}

                <p>更多資訊</p>
              </button>
              <ul className={`border border-black ${!isShow && 'hidden'}`}>
                {/* <p>{JSON.stringify(item.OrderList)}</p> */}
                {item.OrderList.map((artwork) => (
                  <li key={artwork.id}>
                    {/* header */}
                    <div className="flex justify-between  p-2">
                      <div className="flex gap-4">
                        <img
                          className="w-[75px] h-[75px] object-cover rounded-md shadow-md"
                          src={artwork.productImgSrc}
                          alt=""
                        />
                        <div className="flex flex-col gap-1 text-sm justify-center">
                          <p>藝術品ID：{artwork.id}</p>
                          <p>藝術品：{artwork.name}</p>
                          <p>
                            {artwork.price?.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'TWD',
                              minimumFractionDigits: 0,
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col ">
                        <p>上傳者</p>
                        <div className="flex gap-1">
                          <img
                            className="w-[25px] h-[25px] rounded-full"
                            src={artwork?.user?.avatar?.imageUrl}
                            alt=""
                          />
                          <p>{artwork?.user?.name}</p>
                        </div>
                      </div>
                      <div className=" my-auto">
                        <button className="border bg-black text-white p-2">
                          退貨
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {/* <div className="flex justify-between">
                <p>訂單編號：{item?.id}</p>
                <p>訂單建立時間：{new Date(item?.createAt).toLocaleString()}</p>
              </div>
              <div>
                <p>收貨人姓名：{item?.name}</p>
                <p>收貨人電話：{item?.phone}</p>
                <p>收貨人地址：{item?.address}</p>
              </div> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserOrder;
